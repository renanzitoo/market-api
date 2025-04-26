import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  isOwner: boolean;
  name: string;
}

export async function createMarket(app: FastifyInstance) {
  app.post('/market', {preValidation: [app.authenticate],}, async (req, res) => {
    const createMarketBody = z.object({
      name: z.string(),
    });

    const { name } = createMarketBody.parse(req.body);

    const token = req.headers.authorization;


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

      const market = await prisma.market.create({
        data: {
          name,
          owner: user.name,
          userId: user.id,
        },
      });

      return res.status(201).send({ marketId: market.id });
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  });
}