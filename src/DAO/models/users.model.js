import { Schema, model } from 'mongoose';

const schema = new Schema({
  name:{type:String, required:true, max:100},
  lastName:{type:String, required:true, max:100},
  mail: { type: String, required: true, max: 100 },
  password:{type:String, required:true, max:100},
  isAdmin: {type: Boolean, required: true, default: false},
});

export const UserModel = model('users', schema);