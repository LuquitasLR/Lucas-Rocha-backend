import express from "express";
export const cartsRouter = express.Router();
import {carts} from "../services/cartService.js";

cartsRouter.post("/",async (req, res) => {
    try{
      const newCart = await carts.newCart()
      return res
      .status(201)
      .json({status: "success", data: newCart });}
    catch{
      return res
      .status(500)
      .json({ status: "error", msg: "algo salió mal" });
    }
    
  });

  cartsRouter.get("/:cid", async (req, res) => {
    try{
      const _id = req.params.cid;
      const finded = await carts.getCartPopulated(_id)
      return res
      .status(200)
      .json({
      status: "success",
      data: finded
    })}
    catch{
      return res
      .status(500)
      .json({ status: "error", msg: "algo salió mal" });
    }
    
  });

  cartsRouter.put("/:cid", async (req, res) => {
    try{
      const _id = req.params.cid;
      // EL BODY DEBE CONTENER EL OBJETO PRODUCTS CON EL ARRAY DE PRODUCTOS
      const rCart= req.body
      const replaceCart = await carts.repalceCart(_id,rCart)
      return res
      .status(200)
      .json({
      status: "success",
      data: replaceCart
    })}
    catch{
      return res
      .status(500)
      .json({ status: "error", msg: "algo salió mal" });
    }
    
  });

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
    try{
      const idCart = req.params.cid;
      const idProduct= req.params.pid;
      const quantity = req.body.quantity
      const added =  await carts.addProduct(idCart,idProduct,quantity)
      return res
      .status(201)
      .json({status: "success", data: added });
    }
    catch{
      return res
      .status(500)
      .json({ status: "error", msg: "algo salió mal" });
    }
  });

  cartsRouter.delete("/:cid", async (req,res) =>{
  try{

    const _id= req.params.cid
    const deleted = await carts.deleteCart(_id)
    return res
    .status(201)
    .json({status: "success", data: deleted });

  }
  catch{
    return res
    .status(500)
    .json({ status: "error", msg: "algo salió mal" });
  }
  })

  cartsRouter.delete("/:cid/products/:pid", async (req,res) =>{
    try{
      const idCart = req.params.cid;
      const idProduct= req.params.pid;
      const deleted =  await carts.deleteProduct(idCart,idProduct)
      return res
      .status(201)
      .json({status: "success", data: deleted });
    }
    catch{
      return res
      .status(500)
      .json({ status: "error", msg: "algo salió mal" });
    }
  })