import {productMongoose} from '../../mongoose/product.mongoose.js'

class ProductModel {

    async create(product){
        return await productMongoose.create(product)
    }

    async getAll (){
        return await productMongoose.find({})
    }

    async getProduct (_id){
        return await productMongoose.findOne({_id: _id})
    }

    async deleteProduct (_id) {
        return await productMongoose.findByIdAndDelete(_id)
    }

    async paginatedProducts (query,options){
        return await productMongoose.paginate(query,options)
         
    }

    async update (_id, updatedProduct) {
        return await productMongoose.updateOne({_id:_id},updatedProduct)

    }
}

export const productModel = new ProductModel()