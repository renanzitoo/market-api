import z from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function createMarket(app:FastifyInstance){
  app.post('/market', async (req, res)=>{
    const createMarketBody = z.object({
      name : z.string(),
      owner : z.string(),
    })

    const {name, owner} = createMarketBody.parse(req.body)

    const market = await prisma.market.create({
      data : {
        name, 
        owner,
      }
    })

    return res.status(201).send({marketId : market.id })
  })
}