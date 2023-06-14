import { Schema, model } from 'mongoose';

const schema = new Schema({
    
    title: { type: String, required: true, max: 100, index: true },
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    status: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 500 },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },

});

export const ProductModel = model('products', schema);
