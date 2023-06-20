import express from "express";
export const productsRouter = express.Router();
import { products } from "../services/productService.js";

productsRouter.get("/:pid", async (req, res) => {
  try{
    const id = req.params.pid;
    const finded = await products.getProductById(id);
    return res
    .status(200)
    .json({ status: "success", data: finded });
  }
  catch{
    return res
    .status(500)
    .json({ status: "error", msg: "algo salió mal" });  
  }
});

productsRouter.get("/", async (req, res) => {
  try{
    const queryLimit = parseInt(req.query.limit) || 10;
    const queryPage = parseInt(req.query.page) || 1
    let query
    let categoryToLink 
    //CONSIDERE QUE EL STATUS ES LA DISPONIBILIDAD Y LOS VALORES PUEDEN SER TRUE O FALSE
    let status = req.query.status || true
    if(!req.query.category) {query = {status}, categoryToLink=""}else{query = {category: req.query.category,status}, categoryToLink=req.query.category}

    let querySort = req.query.sort || {}
    let sortToLink = req.query.sort || ""
    if(req.query.sort=="asc") {querySort = {price:1}} 
    if(req.query.sort=="desc"){querySort = {price:-1}}
    
    const queryResult = await products.paginatedProducts(query,{sort:querySort,limit:queryLimit,page:queryPage})
    const docs= queryResult.docs
    let { totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = queryResult;

    //CREAMOS LOS LINKS PARA LAS PAGINAS SIGUIENTES Y ANTERIOR, QUERY Y SORT HAY QUE MODIFICARLOS PARA PODER GENERAR EL LINK CORRECTAMENTE.
    if(prevPage){prevPage= `localhost:8080/api/products/?category=${categoryToLink}&limit=${queryLimit}&page=${prevPage}&sort=${sortToLink}&status=${status}`}
    if(nextPage){nextPage= `localhost:8080/api/products/?category=${categoryToLink}&limit=${queryLimit}&page=${nextPage}&sort=${sortToLink}&status=${status}`}
    return res
      .status(200)
      .json({ 
        status: "success", 
        payload:docs, 
        data: {totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage 
      }});   
  }
  
  catch{
    return res
      .status(500)
      .json({ status: "error", msg: "algo salió mal" });   
  }

  
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const _id = req.params.pid;
    const deleted= await products.deleteProduct(_id)
    return res
      .status(200)
      .json({ status: "success", msg: "producto eliminado", data: {deleted} })
  }
  catch{
    return res
    .status(500)
    .json({ status: "error", msg: "algo salió mal" });  
  }
});

productsRouter.post("/", async(req, res) => {
  try{
    const body = req.body;
    let added = await products.addProduct(body)
    return res
      .status(200)
      .json({status: "success", msg: added });
  }
  catch{
    return res
      .status(500)
      .json({ status: "error", msg: "algo salió mal" });  
  }
});

productsRouter.put("/:pid", async(req, res) => {
  try{
    const _id = req.params.pid;
    const body = req.body;
    const mProduct = await products.updateProduct(_id, body)
    return res.status(200)
    .json({status: "success", msg: "producto modificado", data: mProduct });}
  catch{
    return res
    .status(500)
    .json({ status: "error", msg: "algo salió mal" });  
  }

});