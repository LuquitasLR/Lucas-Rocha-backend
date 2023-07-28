import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from "express-handlebars";
import session from 'express-session';
import passport from 'passport';
import path from "path";
import { __dirname } from './config.js';
import { iniPassport } from './config/passport.config.js';
import { authRouter } from './routes/auth.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { vistaProducts } from './routes/home.handlebars.router.js';
import { productsRouter } from './routes/products.router.js';
import { realTimeProductsRouter } from './routes/real-time-products.handlebars.router.js';
import { sessionsRouter } from './routes/sessions.router.js';
import { sessionsViewsRouter } from './routes/sessions.views.router.js';
import { testChatRouter } from './routes/test-chat.router.js';
import { connectMongo } from './utils/dbconection.js';
import { socketServerConection } from './utils/socketServer.js';
import env from './config/enviroment.config.js'

console.log(env)
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
    mongoUrl:env.persistence,
    mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    ttl:150
  })
}))

iniPassport();
app.use(passport.initialize());
app.use(passport.session());


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
app.use("/sessions",sessionsViewsRouter)
app.use("/auth",authRouter)

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