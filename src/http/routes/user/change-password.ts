import z from "zod";
import { FastifyInstance } from "fastify";
import { validate } from "gerador-validador-cpf";
import  bcrypt, { hash }  from "bcrypt"
import { prisma } from "../../../lib/prisma"
import jwt from "jsonwebtoken"

export async function changePassword(app:FastifyInstance){
  app.post('/changepassword', async(req, res)=>{
    const accountToken = z.string

    const token = req.headers.authorization

    const createPasswordBody = z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
    })

    const {oldPassword, newPassword} = createPasswordBody.parse(req.params)

    if(token){
      const tokenReformed = token.split(' ')[1]
      const decoded = jwt.verify(tokenReformed, 'testapi')
           
    }

    
  })

}