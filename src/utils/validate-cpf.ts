import { validate } from "gerador-validador-cpf";
import { prisma } from "../lib/prisma";

export async function validateCPF(cpf: string){
  const validateCpf = validate(cpf)
  if(!validateCpf) {
    return false
  }
  const cpfExists = await prisma.user.findUnique({
    where: {
      cpf: cpf
    }
  })

  if(cpfExists) { 
    return false
  }
  
  return true
}