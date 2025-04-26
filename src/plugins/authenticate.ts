import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization;

  if (!token) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  try {
    const tokenReformed = String(token).split(" ")[1];
    jwt.verify(tokenReformed, String(process.env.SECRET_KEY));
  } catch (error) {
    return reply.status(401).send({ message: "Invalid token" });
  }
}