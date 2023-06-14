import { Schema, model } from 'mongoose';

const schema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100, index: true },
  email: { type: String, required: true, max: 100 },
});

export const UserModel = model('users', schema);