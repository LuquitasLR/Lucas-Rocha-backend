import { productModel } from '../DAO/factory.js';
import CustomError from '../utils/custom-error.js';
import { createProductErrorInfo } from '../utils/info.js';
import EErros from '../utils/enums.js';

class ProductService {

    constructor () {
        

    }

    async addProduct (body) {

        const { title, description, category, status, price, thumbnail, code, stock } = body;
        if (!title || !description || !category || !price || !thumbnail || !status || !code || !stock) {
              return CustomError.createError({
                name: "Product creation error",
                cause: createProductErrorInfo(body),
                message: "Error trying to create a new product",
                code: EErros.INVALID_TYPES_ERROR,
            });
              
            
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
        
        return await productModel.create(product)
        

        
    };

    async getAll (){ 
        return await productModel.getAll()
    }

    async getProduct (_id) { 

        const find = await productModel.getProduct(_id)
        

        if( find ) {
            
            return find

        }else {
            return("Producto no encontrado")
        }
        

    }

        async deleteProduct (_id) {
        
        await productModel.deleteProduct(_id)


    }

    async updateProduct (_id,body) {

        const { title, description, category, status,thumbnail, price,  code, stock } = body;
        if (!title || !description || !category || !thumbnail || !price || !code || !stock) {
            return({msj:"all fields are required."});
        }
        await productModel.update(
            _id ,
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

        return await productModel.getProduct(_id)

    }
    async getPaginatedProducts (query,options){
        return await productModel.paginatedProducts(query,options)
    }

    async reduceStock(cart) {
        for(const productInfo of cart ){
            

        }
    }
}


export const productService = new ProductService()