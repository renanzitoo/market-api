import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { productSchema } from "../../../models/product-model";

export async function updateProduct(app:FastifyInstance){
  app.patch('/product', async (req, res)=>{
    const createProductBody = productSchema;

    const {id, name, brand, price, marketId} = createProductBody.parse(req.body)

    const product = await prisma.product.update({
      where: {
        id : id
      },
      data: {
        name,
        brand,
        price,
        marketId,
      }
    })
    res.status(200).send({message: 'upadated product', product: product })
  })
}