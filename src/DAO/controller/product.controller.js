import {productService} from '../../services/productService.js'

class ProductController {

    getProduct = async (req, res) => {
        try{
          const _id = req.params.pid;
          const finded = await productService.getProduct(_id);
          return res
          .status(200)
          .json({ status: "success", data: finded });
        }
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });  
        }
      }

      getPaginatedProductsApi = async (req, res) => {
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
          
          const queryResult = await productService.getPaginatedProducts(query,{sort:querySort,limit:queryLimit,page:queryPage})
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
      
        
      }

      getPaginatedProductsRender = async (req,res) => {
        try{
        let querypage= parseInt(req.query.querypage) || 1
            const queryResult = await productService.getPaginatedProducts({},{ sort:{},limit:5,page:querypage})
            let paginatedProducts= queryResult.docs
            const { totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = queryResult;
            const user= req.user.mail
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
          return res.render('error-page',{error:'Error al cargar los productos'});
        }
        
    
    
    
    }
      deleteProduct = async (req, res) => {
        try {
          const _id = req.params.pid;
          const deleted= await productService.deleteProduct(_id)
          return res
            .status(200)
            .json({ status: "success", msg: "producto eliminado", data: {deleted} })
        }
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });  
        }
      }

    addProduct = async(req, res) => {
        try{
          const body = req.body;
          let added = await productService.addProduct(body)
          return res
            .status(200)
            .json({status: "success", msg: added });
        }
        catch{
          return res
            .status(500)
            .json({ status: "error", msg: "algo salió mal" });  
        }
    }

    updateProduct = async(req, res) => {
        try{
          const _id = req.params.pid;
          const body = req.body;
          const mProduct = await productService.updateProduct(_id, body)
          return res.status(200)
          .json({status: "success", msg: "producto modificado", data: mProduct });}
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });  
        }
      
    }    
}


export const productController = new ProductController()