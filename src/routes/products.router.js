import express from "express";
export const productsRouter = express.Router();
import { isAdmin } from '../middlewares/auth.js';
import { productController } from "../DAO/controller/product.controller.js";

productsRouter.get("/:pid", productController.getProduct);

productsRouter.get("/", productController.getPaginatedProductsApi);

productsRouter.delete("/:pid", isAdmin, productController.deleteProduct);

productsRouter.post("/", isAdmin, productController.addProduct);

productsRouter.put("/:pid", isAdmin, productController.updateProduct);