import { ProductModel } from '../DAO/models/products.model.js'

export default class productService {

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
        
        await ProductModel.findByIdAndDelete(_id)


    }

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
    async paginatedProducts (query,options){
        const res = await ProductModel.paginate(query,options)
        return res
    }
}

export const products = new productService()