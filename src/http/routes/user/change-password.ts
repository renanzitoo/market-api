import z from "zod";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken"

export async function changePassword(app: FastifyInstance){
    const accountToken = z.string

    const token = req.headers.authorization

    const tokenReformed = String(token).split(' ')[1]
      const decoded = jwt.verify(tokenReformed, 'testapi')
      return decoded

    
  }