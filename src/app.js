import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from './config.js';
import { cartsRouter } from './routes/carts.router.js';
import { vistaProducts } from './routes/home.handlebars.router.js';
import { productsRouter } from './routes/products.router.js';
import { realTimeProductsRouter } from './routes/real-time-products.handlebars.router.js';
import {sessionsRouter} from './routes/sessions.router.js'
import { testChatRouter } from './routes/test-chat.router.js';
import { connectMongo } from './utils/dbconection.js';
import { socketServerConection } from './utils/socketServer.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

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
app.use(session({
  secret:'secretCoder',
  resave:true,
  saveUninitialized:true,
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://rocha15lr:jNYwDq1sMln4lbGx@cluster0.obbcq2b.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    ttl:150
  })
}))


//CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));


//ENDPOINTS TIPO API REST/JSON
app.use("/api/products" ,productsRouter)
app.use("/api/carts" ,cartsRouter)
app.use("/api/sessions",sessionsRouter)


//ENDPOINTS CON VISTAS DE HANDLEBARS
app.use("/products", vistaProducts)
app.use("/realtimeproducts", realTimeProductsRouter)
app.use("/test-chat", testChatRouter)

//ENDPOINT INDEX
app.get('/', (req,res)=>{

  res.render('index')
})

//OTROS ENDPOINTS
app.get("*", (req, res) => {
  return res
  .status(404)
  .json({ status: "error", msg: "no se encuentra esa ruta", data: {} });
});