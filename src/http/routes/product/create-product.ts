import z from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"


export async function createProduct(app: FastifyInstance){
  app.post('/product', async(req, res)=> {
      const createProductBody = z.object({
        name: z.string(),
        brand: z.string(),
        price: z.number(),
        marketId: z.string(),  
      })

      const {name, brand, price, marketId} = createProductBody.parse(req.body)

      const product = await prisma.product.create({
        data: {
          name,
          brand,
          price,
          marketId
        }
      })



      
      return res.status(201).send({productId : product.id })

})
}
