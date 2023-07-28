import express from "express";
export const cartsRouter = express.Router();
import {cartController} from "../DAO/controller/cart.controller.js";

cartsRouter.post("/", cartController.newCart);

cartsRouter.get("/:cid", cartController.getCart);

cartsRouter.put("/:cid", cartController.replaceCart);

cartsRouter.put("/:cid/products/:pid", cartController.addProduct);

cartsRouter.delete("/:cid", cartController.deleteCart)

cartsRouter.delete("/:cid/products/:pid", cartController.deleteProduct) 