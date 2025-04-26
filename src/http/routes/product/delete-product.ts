import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function deleteProduct(app: FastifyInstance){
  app.delete('/product', async (req, res)=> {
    const createProductBody = z.object({
      id: z.string()
    })

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const tokenReformed = String(token).split(' ')[1];
      jwt.verify(tokenReformed, String(process.env.SECRET_KEY));
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }


    const {id} = createProductBody.parse(req.body)

    const productVerify = await prisma.product.findUnique({
      where: {
        id: id
      }
    })

    if (!productVerify) {
      return res.status(404).send({ message: 'Product not found' });
    }

    const product = await prisma.product.delete({
      where: {
        id: id
      }
    })

    res.status(200).send({ message: 'deleted product', product: product})
  })
}