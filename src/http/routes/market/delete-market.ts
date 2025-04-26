import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  isOwner: boolean;
  name: string;
}

export async function deleteMarket(app: FastifyInstance) {
  app.delete('/market', async (req, res)=>{
    const createMarketBody = z.object({
      id: z.string()
    })

    const token = req.headers.authorization;
    const {id} = createMarketBody.parse(req.body)

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const tokenReformed = String(token).split(' ')[1];
      const decoded = jwt.verify(tokenReformed, String(process.env.SECRET_KEY)) as TokenPayload;
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      if (!decoded.isOwner) {
        return res.status(403).send({ message: 'User is not an owner' });
      }
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }
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