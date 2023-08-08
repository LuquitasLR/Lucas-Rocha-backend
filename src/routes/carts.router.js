import express from "express";
export const cartsRouter = express.Router();
import {checkCart} from '../middlewares/auth.js'
import {cartController} from "../DAO/controller/cart.controller.js";
import {ticketController} from "../DAO/controller/ticket.controller.js";

cartsRouter.post("/", cartController.newCart);

cartsRouter.get("/:cid", cartController.getCart);

cartsRouter.put("/:cid",checkCart, cartController.replaceCart);

cartsRouter.put("/:cid/products/:pid",checkCart, cartController.addProduct);

cartsRouter.delete("/:cid", cartController.deleteCart)

cartsRouter.delete("/:cid/products/:pid", cartController.deleteProduct)

cartsRouter.post("/:cid/purchase", ticketController.newTicket);