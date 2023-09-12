import express from "express";
import {checkCart} from '../middlewares/auth.js'
import {cartController} from "../DAO/controller/cart.controller.js";
import {ticketController} from "../DAO/controller/ticket.controller.js";
export const cartsRouter = express.Router();

cartsRouter.post("/", cartController.newCart);

cartsRouter.get("/:cid", cartController.getCart);

cartsRouter.put("/:cid",checkCart, cartController.replaceCart);

cartsRouter.delete("/:cid", cartController.deleteCart)

cartsRouter.put("/:cid/products/:pid",checkCart, cartController.addProduct);

cartsRouter.delete("/:cid/products/:pid", cartController.deleteProduct)

cartsRouter.post("/:cid/purchase", ticketController.newTicket);