import express from "express";
export const cartsRouter = express.Router();
import cartManager from "../cartManager.js";
let cart = new cartManager("./src/carts.json")

cartsRouter.get("/:cid", (req, res) => {
  const id = req.params.cid;
  const finded = cart.getCart(id)
  return res.status(200).json({
    status: "success",
    data: finded
  });
});

cartsRouter.post("/", (req, res) => {
    
    const newCart = cart.newCart()
    return res
      .status(201)
      .json({status: "success", msg: newCart });
  });

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const idCart = req.params.cid;
    const idProduct= req.params.pid;
    const added = cart.addProduct(idCart,idProduct)
    return res
      .status(201)
      .json({status: "success", msg: added });
  });