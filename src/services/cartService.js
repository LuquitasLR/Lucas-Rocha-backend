import { CartModel } from "../DAO/models/cart.model.js"

class cartService {

    constructor () {
        
    }


    async newCart (){
        return await CartModel.create({products:[]})
        
    }

    async getCart (_id) {

        return await CartModel.findOne({_id: _id})

    }
   
    async addProduct (idCart,idProduct,quantity) {

        const existCart = await CartModel.findOne({_id:idCart})
        if(existCart){
            
            //VERIFICAMOS SI EXISTE PARA NO DUPLICAR EL PRODUCTO
            const existProduct = existCart.products.find((prod)=>prod._id==idProduct)
            if(existProduct){
                const i = existCart.products.findIndex((prod)=> prod._id== idProduct)
                existCart.products[i].quantity = quantity
                await CartModel.updateOne({_id:idCart},existCart)
                return await CartModel.findOne({_id:idCart})
            }
            else{
                existCart.products.push({_id:idProduct,quantity:quantity})
                await CartModel.updateOne({_id:idCart},existCart)
                return await CartModel.findOne({_id:idCart})
            }
            
        }
        else{
            return {msj:"No se pudo agregar el producto"}
        }
            
    }
    async repalceCart (idCart,rCart) {
        const exist = await CartModel.findOne({_id:idCart})
        if(exist){
            await CartModel.updateOne({_id:idCart},rCart)
            return await CartModel.findOne({_id:idCart})
        }else{
            return {msj:"Carrito no encontrado"}
        }
        

    }

    async deleteCart (_id) {

        const exist = await CartModel.findOne({_id:_id})
        if(exist){

            const empty = {products:[]}
            await CartModel.updateOne({_id:_id},empty)
            return await CartModel.findOne({_id:_id})

        }else{

            return {msj:"carrito no encontrado"}

        }

    }

    async deleteProduct(idCart,idProduct){

        const existCart = await CartModel.findOne({_id:idCart})
        if(existCart){
            const existProduct = existCart.products.find((prod)=>prod._id==idProduct)
            
            if(existProduct){
                const dProduct = existCart.products.filter((prod)=> prod._id !== idProduct)
                const products = {products:dProduct}
                console.log(products)
                await CartModel.updateOne({_id:idCart},products)
                return await CartModel.findOne({_id:idCart})
            }
            else{
                return {msj:"producto no encontrado"}
            }

        }else{

            return {msj:"carrito no encontrado"}

        }

    }
}

export const carts = new cartService()