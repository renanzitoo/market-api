import z from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"

export async function getMarket(app:FastifyInstance) {
  app.get('/market/:marketId', async (req, res) => {
    const getMarketParams = z.object({
      marketId : z.string().uuid()
    })

    const { marketId } = getMarketParams.parse(req.params)

    const market = await prisma.market.findUnique({
      where : {
        id : marketId
      }
    })

    if(!market) {
      return res.status(400).send({message : 'Market not found'})
    }

    return res.status(200).send({market : market})

    
  })
  
}