import express from "express";
export const vistaProducts = express.Router();
import { products } from "../services/productService.js";


vistaProducts.get("/", async (req,res) => {
    try{
    let querypage= parseInt(req.query.querypage) || 1
        const queryResult = await products.paginatedProducts({},{ sort:{},limit:5,page:querypage})
        let paginatedProducts= queryResult.docs
        const { totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = queryResult;
        const user= req.session.user
        paginatedProducts= paginatedProducts.map((product)=>{
            return {
                _id:product._id.toString(),
                title: product.title,
                description: product.description,
                price: product.price,
            }
        }
        )
        return res.status(200).render("products",{user, paginatedProducts,totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage})

    }
    catch{
        console.log("error")
    }
    



})