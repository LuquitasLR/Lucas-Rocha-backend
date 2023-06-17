import express from "express";
export const realTimeProductsRouter = express.Router();
import {products} from '../services/ProductService.js'

const getProducts = products.getProducts()

realTimeProductsRouter.get("/", (req,res) => {

    return res.status(200).render("real-time-products",{})



})