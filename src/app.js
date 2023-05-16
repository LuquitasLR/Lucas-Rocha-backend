import express from 'express'
const app = express()
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';

const port = 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//ENDPOINTS TIPO API REST/JSON
app.use("/api/products" ,productsRouter)
app.use("/api/carts" ,cartsRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//OTROS ENDPOINTS
app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "no se encuentra esa ruta", data: {} });
});