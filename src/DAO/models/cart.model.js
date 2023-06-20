import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products:{ type:[{
    product:{type:Schema.Types.ObjectId, ref:'products'},
    quantity:{type:Number}}
  ]},
});

cartSchema.pre('findOne', function(){
  this.populate('products.product')
})

export const CartModel = model('cart', cartSchema);