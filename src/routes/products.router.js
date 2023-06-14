import express from "express";
import ProductManager from "../services/ProductService.js";
export const productsRouter = express.Router();
export let products = new ProductManager ();

productsRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const finded = await products.getProductById(id);
  return res.status(200).json({
    status: "success",
    data: finded
  });
});

productsRouter.get("/", async (req, res) => {

  const limit = req.query.limit;
  const getProducts = await products.getProducts()
  if (limit) {
    const limitProducts = getProducts.slice(0, limit);
    return res
    .status(200)
    .json({ status: "success", msg: "cantidad seleccionada de productos", data: limitProducts }); 
  }else{

    return res
    .status(200)
    .json({ status: "success", msg: "todos los productos", data: getProducts });

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