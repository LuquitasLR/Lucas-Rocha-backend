import express from "express";
export const vistaProducts = express.Router();
import { productController } from "../DAO/controller/product.controller.js";


vistaProducts.get("/", productController.getPaginatedProductsRender)