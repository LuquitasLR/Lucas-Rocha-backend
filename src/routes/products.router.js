import express from "express";
import ProductManager from "../ProductManager.js";
export const productsRouter = express.Router();
let products = new ProductManager ("./src/products.json");

productsRouter.get("/:pid", (req, res) => {
  const id = req.params.pid;
  const finded = products.getProductById(id);
  return res.status(200).json({
    status: "success",
    data: finded
  });
});

productsRouter.get("/", (req, res) => {

  const limit = req.query.limit;
  const getProducts = products.getProducts()
  if (limit) {
    const limitProducts = getProducts.slice(0, limit);
    return res
    .status(200)
    .json({ status: "success", msg: "cantidad seleccionada de productos", data: limitProducts }); 
  }

  return res
    .status(200)
    .json({ status: "success", msg: "todos los productos", data: products.getProducts() });
});

productsRouter.delete("/:pid", (req, res) => {
  const id = req.params.pid;
  products = products.deleteProduct(id)
  return res
    .status(200)
    .json({ status: "success", msg: "producto eliminado", data: {} });
});

productsRouter.post("/", (req, res) => {
  const p = req.body;
  let added = products.addProduct(p.title, p.description, p.code, p.price, p.thumbnail, p.stock, p.category)
  return res
    .status(201)
    .json({status: "success", msg: added });
});

productsRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const nParams = req.body;
  const mProduct = await products.updateProduct(id, nParams)
  return res.status(200)
  .json({status: "success", msg: "producto modificado", data: mProduct });

});