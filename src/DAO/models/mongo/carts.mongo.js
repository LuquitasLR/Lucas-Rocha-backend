import {cartMongoose} from '../../mongoose/cart.mongoose.js'

class CartModel {

    async create(cart){
        return await cartMongoose.create(cart)
    }

    async getCart (_id){
        return await cartMongoose.findOne({_id: _id})
    }

    async getCartAndPopulate (_id, populateProps) {
        return await cartMongoose.findOne({_id: _id}).populate(populateProps)

    }
    async update (_id, updatedCart) {
        return await cartMongoose.updateOne({_id:_id},updatedCart)

    }
}

export const cartModel = new CartModel()