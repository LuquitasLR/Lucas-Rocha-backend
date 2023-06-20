import { ProductModel } from '../DAO/models/products.model.js'

class productService {

    constructor () {
        

    }

    async addProduct (body) {

        const { title, description, category, status, price, thumbnail, code, stock } = body;
        if (!title || !description || !category || !price || !thumbnail || !status || !code || !stock) {
            
            return({msj:"all fields are required."});
            
        }
        
        const product = {
            
            title: title,
            description: description,
            code: code,
            price: price,
            status:status,
            thumbnail: thumbnail,
            stock: stock,
            category: category
            
        }
        
        return await ProductModel.create(product)
        

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

        const { title, description, category, status,thumbnail, price,  code, stock } = body;
        if (!title || !description || !category || !thumbnail || !price || !code || !stock) {
            return({msj:"all fields are required."});
        }
        await ProductModel.updateOne(
          { _id },
          {
            title,
            description,
            category,
            price,
            status,
            thumbnail,
            code,
            stock,
          }
        );

        return await ProductModel.findOne({_id:_id})

    }
    async paginatedProducts (query,options){
        const res = await ProductModel.paginate(query,options)
        return res
    }
}

export const products = new productService()