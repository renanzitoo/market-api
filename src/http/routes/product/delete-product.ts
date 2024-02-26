import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function deleteProduct(app: FastifyInstance){
  app.delete('/product', async (req, res)=> {
    const createProductBody = z.object({
      id: z.string()
    })

    const {id} = createProductBody.parse(req.body)

    const product = await prisma.product.delete({
      where: {
        id: id
      }
    })

    res.status(200).send({ message: 'deleted product', product: product})
  })
}