import { Schema, model } from 'mongoose';

const schema = new Schema({
    
    code: { type: String, required: true, index: true },
    purchase_datetime: { type: String, required: true, },
    amount: { type: Number, required: true, },
    purchaser: { type: String, required: true, },
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

export const ticketMongoose = model('ticket', schema);