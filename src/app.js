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
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

const app = express()
const port = 8080
const fileStore= FileStore(session)

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
    ttl:15
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


//ENDPOINTS CON VISTAS DE HANDLEBARS
app.use("/products", vistaProducts)
app.use("/realtimeproducts", realTimeProductsRouter)
app.use("/test-chat", testChatRouter)

//SESSION
app.get('/session', (req,res)=>{

  if(req.session?.count) {
    req.session.count++
    res.send('nos visistaste '+req.session.count+' veces!')
  }
  else{
    req.session.count = 1
    req.session.nombre = 'lucas'
    res.send('nos visistas por primera vez!')
  }
})
app.get('/login', (req, res) => {
  const { username, password } = req.query;
  if (username !== 'pepe' || password !== 'pepepass') {
    return res.send('login failed');
  }
  req.session.user = username;
  req.session.admin = false;
  res.send('login success!');
});
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: 'session eliminar ERROR' });
    }
    res.send('Logout ok!');
  });
});

function checkLogin(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).send('error de autorización!');
  }
}

app.get('/perfil', checkLogin, (req, res) => {
  res.send('todo el perfile');
});


//OTROS ENDPOINTS
app.get("*", (req, res) => {
  return res
  .status(404)
  .json({ status: "error", msg: "no se encuentra esa ruta", data: {} });
});