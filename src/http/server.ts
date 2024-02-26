import fastify from "fastify";
import { createMarket } from "./routes/create-market";
import { createProduct } from "./routes/create-product";
import { getMarket } from "./routes/get-market";
import { getProduct } from "./routes/get-product";
import { updateMarket } from "./routes/update-market";

const app = fastify()

app.listen({
  port: 3232
}).then(()=>{
  console.log('Server running on port 3232')
})

app.register(createMarket)
app.register(createProduct)
app.register(getMarket)
app.register(getProduct)
app.register(updateMarket)