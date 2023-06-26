import express from "express";
export const realTimeProductsRouter = express.Router();

realTimeProductsRouter.get("/", (req,res) => {

    return res.status(200).render("real-time-products",{})



})