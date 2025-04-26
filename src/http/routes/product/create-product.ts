import z from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"
import { productSchema } from "../../../models/product-model"


export async function createProduct(app: FastifyInstance){
  app.post('/product', async(req, res)=> {
      const createProductBody = productSchema;

      const {name, brand, price, marketId, photo} = createProductBody.parse(req.body)

      const product = await prisma.product.create({
        data: {
          name,
          brand,
          price,
          marketId,
          photo
        }
      })



      
      return res.status(201).send({productId : product.id })

})
}
