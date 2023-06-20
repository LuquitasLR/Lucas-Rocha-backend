import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from './config.js';
import { cartsRouter } from './routes/carts.router.js';
import { vistaProducts } from './routes/home.handlebars.router.js';
import { productsRouter } from './routes/products.router.js';
import { realTimeProductsRouter } from './routes/real-time-products.handlebars.router.js';
import { testChatRouter } from './routes/test-chat.router.js';
import { connectMongo } from './utils/dbconection.js';
import { socketServerConection } from './utils/socketServer.js';


const app = express()
const port = 8080

export const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


socketServerConection(httpServer)
connectMongo()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));


//ENDPOINTS TIPO API REST/JSON
app.use("/api/products" ,productsRouter)
app.use("/api/carts" ,cartsRouter)


//ENDPOINTS CON VISTAS DE HANDLEBARS
app.use("/products", vistaProducts)
app.use("/realtimeproducts", realTimeProductsRouter)
app.use("/test-chat", testChatRouter)


//OTROS ENDPOINTS
app.get("*", (req, res) => {
  return res
  .status(404)
  .json({ status: "error", msg: "no se encuentra esa ruta", data: {} });
});