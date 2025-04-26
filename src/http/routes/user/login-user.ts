import z from "zod";
import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function loginUser(app: FastifyInstance) {
  app.post('/login', async (req, res) => {
    const userLoginBody = z.object({
      login: z.string().email(),
      password: z.string(),
    });
    const { login, password } = userLoginBody.parse(req.body);

    const validateEmail = await prisma.user.findUnique({
      where: {
        email: login,
      },
    });

    if (!validateEmail) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, validateEmail.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const payload = {
      userId: validateEmail.id, 
      name: validateEmail.name,
      email: validateEmail.email,
      isOwner: validateEmail.isOwner,
    };

    const token = jwt.sign(payload, String(process.env.SECRET_KEY), {
      expiresIn: '1d',
    });

    return res.status(200).send({
      message: 'Successfully logged in',
      token: token,
    });
  });
}

