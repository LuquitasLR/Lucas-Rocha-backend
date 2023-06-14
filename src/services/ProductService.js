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
        let products = await ProductModel.find({})
        return products
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

        const { title, description, category, status, price, code, stock } = body;
        if (!title || !description || !category || !price || !status || !code || !stock) {
          console.log("all fields are required.");
        }
        const productUpdate = await ProductModel.updateOne(
          { _id },
          {
            title,
            description,
            category,
            price,
            status,
            code,
            stock,
          }
        );

        return productUpdate;

    }

}

