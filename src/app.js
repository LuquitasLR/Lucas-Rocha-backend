import express from 'express';
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import { cartsRouter } from './routes/carts.router.js';
import { vistaProducts } from './routes/home.handlebars.router.js';
import { productsRouter } from './routes/products.router.js';
import { realTimeProductsRouter } from './routes/real-time-products.handlebars.router.js';
import __dirname from "./utils.js";
import { products } from './routes/products.router.js';

const app = express()
const port = 8080

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//INICIAMOS EL SOCKET SERVER
const socketServer = new Server(httpServer);


socketServer.on ("connection", (socket) => {
  console.log (socket.id, "socket conectado")
})



socketServer.on ("newProduct", async (newProduct) => {

  try {

    products.addProduct(newProduct.title, newProduct.description, newProduct.code, newProduct.price, newProduct.thumbnail, newProduct.stock, newProduct.category)
    const productsList= await products.getProducts()
    console.log(productsList)
    socketServer.emit("products",productsList)
  }
  
  catch (error) {
    console.log(error)
  }
})


app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//ENDPOINTS TIPO API REST/JSON
app.use("/api/products" ,productsRouter)
app.use("/api/carts" ,cartsRouter)

//ENDPOINTS CON VISTAS DE HANDLEBARS
app.use("/home", vistaProducts)
app.use("/realtimeproducts", realTimeProductsRouter)



//OTROS ENDPOINTS
app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "no se encuentra esa ruta", data: {} });
});