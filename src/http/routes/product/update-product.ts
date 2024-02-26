import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function updateProduct(app:FastifyInstance){
  app.patch('/product', async (req, res)=>{
    const createProductBody = z.object({
      id : z.string(),
      name : z.string(),
      brand: z.string(),
      price: z.number(),
      marketId: z.string()
    })

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