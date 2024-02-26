import z from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"

export async function getProduct(app:FastifyInstance) {
  app.get('/product/:productId', async (req, res) =>{
    const getProductParams = z.object({
      productId : z.string().uuid()
    })

    const { productId } = getProductParams.parse(req.params)

    const product = await prisma.product.findUnique({
      where : {
        id : productId
      }
    })

    if(!product) {
      return res.status(500).send({message : 'Product not found'})
    }
    res.status(200).send({product : product})
  })
}