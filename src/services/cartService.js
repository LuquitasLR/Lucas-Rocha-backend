import { cartModel } from "../DAO/models/mongo/carts.mongo.js"
//import {cartModel} from '../DAO/models/memory/cart.memory.js'

class CartService {

    constructor () {
        
    }


    async newCart (){
        return await cartModel.create({products:[]})
        
    }

    async getCart (_id) {
        return await cartModel.getCart(_id)

    }

    async getCartPopulated (_id) {
        return await cartModel.getCartAndPopulate(_id, 'products.product')

    }
   
    async addProduct (idCart,idProduct,quantity) {

        const existCart = await cartModel.getCart(idCart)
        if(existCart){
            
            //VERIFICAMOS SI EXISTE PARA NO DUPLICAR EL PRODUCTO
            const existProduct = existCart.products.find((products)=>products.product==idProduct)
            if(existProduct){
                const i = existCart.products.findIndex((products)=> products.product== idProduct)
                existCart.products[i].quantity = quantity
                await cartModel.update(idCart,existCart)
                return cartModel.getCart(idCart)
            }
            else{
                existCart.products.push({product:idProduct,quantity:quantity})
                await cartModel.update(idCart,existCart)
                return cartModel.getCart(idCart)
            }
            
        }
        else{
            return {msj:"No se pudo agregar el producto"}
        }
            
    }
    async repalceCart (idCart,rCart) {
        const exist = await cartModel.getCart(idCart)
        if(exist){
            await cartModel.update(idCart,rCart)
            return cartModel.getCart(idCart)
        }else{
            return {msj:"Carrito no encontrado"}
        }
        

    }

    async deleteCart (_id) {

        const exist = await cartModel.getCart(_id)
        if(exist){

            const empty = {products:[]}
            await cartModel.update(_id,empty)
            return await cartModel.getCart(_id)

        }else{

            return {msj:"carrito no encontrado"}

        }

    }

    async deleteProduct(idCart,idProduct){

        const existCart = await cartModel.getCart(idCart)
        if(existCart){
            const existProduct = existCart.products.find((prod)=>prod.product==idProduct)
            
            if(existProduct){
                const dProduct = existCart.products.filter((prod)=> prod.product != idProduct)
                const products = {products:dProduct}
                await cartModel.update(idCart,products)
                return await cartModel.getCart(idCart)
            }
            else{
                return {msj:"producto no encontrado"}
            }

        }else{

            return {msj:"carrito no encontrado"}

        }

    }
}

export const cartService = new CartService()