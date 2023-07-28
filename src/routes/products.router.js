import express from "express";
export const productsRouter = express.Router();
import { productController } from "../DAO/controller/product.controller";

productsRouter.get("/:pid", productController.getProduct);

productsRouter.get("/", productController.getPaginatedProductsApi);

productsRouter.delete("/:pid", productController.deleteProduct);

productsRouter.post("/", productController.addProduct);

productsRouter.put("/:pid", productController.updateProduct);