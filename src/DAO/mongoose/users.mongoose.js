import { Schema, model } from 'mongoose';

const schema = new Schema({
  firstName:{type:String, required:true, max:100},
  lastName:{type:String, required:true, max:100},
  mail: { type: String, required: true, max: 100 },
  age: {type: Number},
  password:{type:String, required:false, max:100},
  cart:{type:String, required:false},
  role: {type: String, required: true, default: "user"},
});

export const userMongoose = model('users', schema);