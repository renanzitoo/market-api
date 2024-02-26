import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function updateMarket(app:FastifyInstance){
  app.patch('/market', async (req, res)=>{
    const createMarketBody = z.object({
      id : z.string(),
      name : z.string(),
      owner : z.string(),
    })

    const {name, owner, id} = createMarketBody.parse(req.body)

    const market = await prisma.market.update({
      where: {
        id : id
      }, 
      data: {
        name,
        owner
      }
    })

    
    res.status(200).send({message: 'updated complete', market : market})

  })
}
