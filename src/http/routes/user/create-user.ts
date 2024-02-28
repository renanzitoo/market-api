import z from "zod";
import { FastifyInstance } from "fastify";
import  bcrypt from "bcrypt"
import { prisma } from "../../../lib/prisma"
import { validateCPF } from "../../../utils/validate-cpf";
import { emailExists } from "../../../utils/validate-email";


export async function registerUser(app: FastifyInstance){
  app.post('/register', async (req, res)=> {
  const createUserBody = z.object({
    name : z.string(),
    age : z.number(),
    cpf: z.string(),
    birthday: z.string(),
    email: z.string().email(),
    password: z.string(),
    isOwner: z.boolean(),
  })

  const {name, age, cpf, birthday, email, password, isOwner} = createUserBody.parse(req.body)

  const validCPF = await validateCPF(cpf)
  const emailExist = await emailExists(email)
  console.log(emailExist)

  if(!validCPF){
    res.status(400).send({message: 'cpf already in use, or invalid try again'})
  }
  if(emailExist){
    res.status(400).send({message: 'email already in use'})
  }
  

  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(password, salt)

  const createUser = await prisma.user.create({
    data: {
      name,
      age,
      cpf,
      birthday,
      email,
      password: hash,
      isOwner
    }
  })

  res.status(200).send({message: 'user registered', userId: createUser.id})
})

}
