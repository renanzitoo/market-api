import z from "zod";
import { FastifyInstance } from "fastify";
import { validate } from "gerador-validador-cpf";
import  bcrypt, { hash }  from "bcrypt"
import { prisma } from "../../../lib/prisma"


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

  const saltRounds = 10

  const validateCpf = validate(cpf)
  if(!validateCpf) {
    res.status(400).send({ message: 'CPF is invalid'})
  }

  const emailExists = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if(emailExists){
    res.status(400).send({message: 'email already in use'})
  }

  const cpfExists = await prisma.user.findUnique({
    where: {
      cpf: cpf
    }
  })

  if(cpfExists){
    res.status(400).send({message: 'cpf already in use'})
  }

  const salt = await bcrypt.genSalt(saltRounds)
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
})

}
