import fastify from "fastify";
import { createMarket } from "./routes/market/create-market";
import { createProduct } from "./routes/product/create-product";
import { getMarket } from "./routes/market/get-market";
import { getProduct } from "./routes/product/get-product";
import { updateMarket } from "./routes/market/update-market";
import { updateProduct } from "./routes/product/update-product";
import { deleteMarket } from "./routes/market/delete-market";
import { deleteProduct } from "./routes/product/delete-product";
import { registerUser } from "./routes/user/create-user";
import { loginUser } from "./routes/user/login-user";
import 'dotenv/config'

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
app.register(updateProduct)
app.register(deleteMarket)
app.register(deleteProduct)
app.register(registerUser)
app.register(loginUser)
