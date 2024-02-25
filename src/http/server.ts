import fastify from "fastify";
import { createMarket } from "./routes/create-market";

const app = fastify()

app.listen({
  port: 3232
}).then(()=>{
  console.log('Server running on port 3232')
})

app.register(createMarket)