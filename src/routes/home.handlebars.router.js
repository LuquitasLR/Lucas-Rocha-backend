import express from "express";
export const vistaProducts = express.Router();
import {products} from './products.router.js'

const getProducts = products.getProducts()

vistaProducts.get("/", (req,res) => {
    const title = "Lista de productos disponibles:"
    return res.status(200).render("home",{title,getProducts})



})