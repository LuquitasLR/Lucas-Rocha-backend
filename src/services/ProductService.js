//import fs from 'fs'
import { ProductModel } from '../DAO/models/products.model.js'

export default class ProductManager {

    constructor () {
        

    }

    async addProduct (title, description, code, price, thumbnail, stock, category) {
            
        const product = {

            title: title,
            description: description,
            code: code,
            price: price || 0,
            status:true,
            thumbnail: thumbnail,
            stock: stock || 0,
            category: category

        }
        await ProductModel.create(product)
        return ("producto agregado exitosamente")
        

    }

    async getProducts (){
        return  await ProductModel.find({})
    }

    async getProductById (id) {

        const find = await ProductModel.findOne({_id: id})
        

        if( find ) {
            
            return find

        }else {
            return("Producto no encontrado")
        }
        

    }

        async deleteProduct (_id) {

        // const toDelete = ProductModel.findOne({_id: id})
        
        await ProductModel.findByIdAndDelete(_id)
        // if( toDelete ) {
            
        //     ProductModel.deleteOne({_id: id})

        // }else {
        //     console.log("Not Found")
        // }



    }

    // ESTOY TENIENDO PROBLEMAS QUIZAS CON ESTE METODO, NO PUEDO MODIFICAR EL PRODUCTO CON POSTMAN.
    async updateProduct (_id,body) {

        //if (!body.title || !body.description || !body.category || !body.price  || !body.code || !body.stock || !body.status) {
          //  return console.log("all fields are required.");
        //  }
            
           const updated= await ProductModel.updateOne({_id: _id},
             body.title,
             body.description,
             body.code,
             body.status,
             body.thumbnail,
             body.stock,
             body.category)
             console.log(body)

           return updated

    }

}

