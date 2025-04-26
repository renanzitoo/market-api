import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { authenticate } from "../../../plugins/authenticate";

interface TokenPayload {
  userId: string;
}

export async function getUserByToken(app: FastifyInstance) {
  app.get("/user", {
    preValidation: [authenticate],
  }, async (request, reply) => {
    const token = request.headers.authorization;

    if (!token) {
      return reply.status(401).send({ message: "Unauthorized" });
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
        return reply.status(404).send({ message: "User not found" });
      }

      return reply.send(user);
    } catch (error) {
      return reply.status(401).send({ message: "Invalid token" });
    }
  });
}
