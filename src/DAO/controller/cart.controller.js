import {cartService} from '../../services/cartService.js'

class CartController {

    newCart = async (req,res)=>{
        try{
            const newCart = await cartService.newCart()
            return res
            .status(201)
            .json({status: "success", data: newCart });}
          catch{
            return res
            .status(500)
            .json({ status: "error", msg: "algo salió mal" });
          }
    }

    getCart = async (req, res) => {
        try{
          const _id = req.params.cid;
          const finded = await cartService.getCartPopulated(_id)
          return res
          .status(200)
          .json({
          status: "success",
          data: finded
        })}
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });
        }
        
      }
     replaceCart = async (req, res) => {
        try{
          const _id = req.params.cid;
          // EL BODY DEBE CONTENER EL OBJETO PRODUCTS CON EL ARRAY DE PRODUCTOS
          const rCart= req.body
          const replaceCart = await cartService.repalceCart(_id,rCart)
          return res
          .status(200)
          .json({
          status: "success",
          data: replaceCart
        })}
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });
        }
        
      }

      addProduct = async (req, res) => {
        try{
          const idCart = req.params.cid;
          const idProduct= req.params.pid;
          const quantity = req.body.quantity
          const added =  await cartService.addProduct(idCart,idProduct,quantity)
          return res
          .status(201)
          .json({status: "success", data: added });
        }
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });
        }
      }

      deleteCart = async (req,res) =>{
        try{
      
          const _id= req.params.cid
          const deleted = await cartService.deleteCart(_id)
          return res
          .status(201)
          .json({status: "success", data: deleted });
      
        }
        catch{
          return res
          .status(500)
          .json({ status: "error", msg: "algo salió mal" });
        }
        }

        deleteProduct = async (req,res) =>{
            try{
              const idCart = req.params.cid;
              const idProduct= req.params.pid;
              const deleted =  await cartService.deleteProduct(idCart,idProduct)
              return res
              .status(201)
              .json({status: "success", data: deleted });
            }
            catch{
              return res
              .status(500)
              .json({ status: "error", msg: "algo salió mal" });
            }
          }
    
}


export const cartController = new CartController()