import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products:{ 
    type:[
      {  product:{
          type:Schema.Types.ObjectId, 
          ref:"products",
          },
          quantity:{type:Number}
      }
    ]},
});

export const cartMongoose = model('cart', cartSchema);