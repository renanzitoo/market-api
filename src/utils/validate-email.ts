import { prisma } from "../lib/prisma"


export async function emailExists(email: string){
const emailExists = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  if(emailExists){
    return true
  }
  return false
}