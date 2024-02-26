import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function deleteMarket(app: FastifyInstance) {
  app.delete('/market', async (req, res)=>{
    const createMarketBody = z.object({
      id: z.string()
    })
    const {id} = createMarketBody.parse(req.body)

    const productVerify = await prisma.product.findMany({
      where: {
        marketId: id
      }
    })

    if (productVerify){
      const product = await prisma.product.deleteMany({
        where: {
          marketId : id
        }
      })
    }
    

    const market = await prisma.market.delete({
      where: {
        id : id
      }
    })
    res.status(200).send({message: 'deleted market', market: market })
  })

}