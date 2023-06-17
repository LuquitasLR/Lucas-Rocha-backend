import express from "express";
export const vistaProducts = express.Router();
//import {products} from "../services/ProductService.js"
import { ProductModel } from "../DAO/models/products.model.js";


vistaProducts.get("/", async (req,res) => {
    try{
    const {querypage}= req.query
        const queryResult = await ProductModel.paginate({category:"procesadores"},{ sort:{price:1},limit:5,page:querypage||1})
        let paginatedProducts= queryResult.docs
        const { totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = queryResult;
        paginatedProducts= paginatedProducts.map((product)=>{
            return {
                _id:product._id.toString(),
                title: product.title,
                description: product.description,
                price: product.price,
            }
        }
        )
        return res.status(200).render("home",{paginatedProducts,totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage})

    }
    catch{
        console.log("error")
    }
    



})