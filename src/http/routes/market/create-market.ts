import z from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"
import jwt from "jsonwebtoken"

export async function createMarket(app:FastifyInstance){
  app.post('/market', async (req, res)=>{
    const createMarketBody = z.object({
      name : z.string(),
      userId: z.string()
    })

    const {name, userId} = createMarketBody.parse(req.body)

    const token = req.headers.authorization

    const tokenReformed = String(token).split(' ')[1]
      const decoded = jwt.verify(tokenReformed, String(process.env.SECRET_KEY))

      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

    
    if(decoded){
      if(user){
        if(user.isOwner){
          const market = await prisma.market.create({
            data : {
              name, 
              owner: user.name,
              userId
            }
          })
          return res.status(201).send({marketId : market.id })
        }
      }else {
        return res.status(400).send({message: 'user is not owner'})
      }
    }else{
      return res.status(400).send({message: 'user is not logged-in'})
    }
  })
}