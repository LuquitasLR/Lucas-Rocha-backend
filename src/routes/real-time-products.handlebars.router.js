import express from "express";
export const realTimeProductsRouter = express.Router();
// import {products} from './products.router.js'

// const getProducts = products.getProducts()

realTimeProductsRouter.get("/", (req,res) => {
    // const title = "Lista de productos disponibles:"
    return res.status(200).render("real-time-products",{})



})