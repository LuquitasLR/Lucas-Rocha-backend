import express from "express";
export const vistaCart = express.Router();
import { cartController } from "../DAO/controller/cart.controller.js";


vistaCart.get("/", cartController.getCartToRender)