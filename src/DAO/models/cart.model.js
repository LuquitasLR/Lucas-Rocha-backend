import { Schema, model } from 'mongoose';

const schema = new Schema({
  products:[{_id:String, quantity:Number}],
});

export const CartModel = model('cart', schema);