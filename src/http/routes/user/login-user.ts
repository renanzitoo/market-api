import z from "zod";
import fastify, { FastifyInstance } from "fastify";
import  bcrypt, { hash }  from "bcrypt"
import { prisma } from "../../../lib/prisma"
import { validateHeaderName } from "http";
import jwt from "jsonwebtoken"

export async function loginUser(app: FastifyInstance){
  app.post('/login', async (req, res)=>{
    const userLoginBody = z.object({
      login: z.string().email(),
      password: z.string(),
    })
    const {login, password} = userLoginBody.parse(req.body)

    const mySecretKey = 'testapi'

    const validateEmail =  await prisma.user.findUnique({
      where: {
        email: login
      }
    })
    if(!validateEmail) {
      res.status(400).send({message: 'Invalid email or password'})
    }else {
      const isPasswordValid  = await bcrypt.compare(password, validateEmail?.password)
      if(!isPasswordValid) {
        res.status(400).send({message: 'Invalid email or password'})
      }
      else{
        const payload = {
          name: validateEmail.name,
          email : validateEmail.email,
          password: validateEmail.password      
        }
        const token = jwt.sign(payload, mySecretKey, {
          expiresIn: '1d'
        })

        res.status(200).send({
          message: 'successfully logged', 
          token: token
        })
      }
    }

    
    
   
  })
}

