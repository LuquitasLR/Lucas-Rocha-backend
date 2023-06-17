import express from "express";
export const productsRouter = express.Router();
import { products } from "../services/ProductService.js";

productsRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const finded = await products.getProductById(id);
  return res.status(200).json({
    status: "success",
    data: finded
  });
});

productsRouter.get("/", async (req, res) => {

  let limit = req.query.limit;
  const getProducts = await products.getProducts()
  if (limit) {
    const limitProducts = getProducts.slice(0, limit);
    return res
    .status(200)
    .json({ status: "success", msg: "cantidad seleccionada de productos", data: limitProducts }); 
  }else{
    limit=10
    const limitProducts = getProducts.slice(0, limit);
    return res
    .status(200)
    .json({ status: "success", msg: "todos los productos(limite=10)", data: limitProducts });

  }

  
});

productsRouter.delete("/:pid", async (req, res) => {
try {
  const _id = req.params.pid;
  const deleted= await products.deleteProduct(_id)
  return res
    .status(200)
    .json({ status: "success", msg: "producto eliminado", data: {deleted} })
}
catch{console.log ("error")}
});

productsRouter.post("/", (req, res) => {
  const p = req.body;
  let added = products.addProduct(p.title, p.description, p.code, p.price, p.thumbnail, p.stock, p.category)
  return res
    .status(201)
    .json({status: "success", msg: added });
});

productsRouter.put("/:pid", async(req, res) => {
  const _id = req.params.pid;
  const body = req.body;
  const toUpdate = products.updateProduct(_id, body)
  const mProduct = await products.getProductById(_id);
  return res.status(200)
  .json({status: "success", msg: "producto modificado", data: mProduct });

});