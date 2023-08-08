import { userModel } from "../DAO/models/mongo/user.mongo.js";
//import {userModel} from '../DAO/models/memory/user.memory.js'

class UserService {

    async newUser (newUser){
        try{
           return userModel.create(newUser)
        }
        catch{
            throw "error";
        }
    }

    async getUser (mail) {
        try{
           return await userModel.getUser(mail)

        }
        catch{
            throw "usuario no encontrado";
        }
    }

    async findById (_id) {
        try{
            return await userModel.findById(_id)
 
         }
         catch{
             throw "usuario no encontrado";
         }
    }
    async findByCart (cart) {
        try{
            return await userModel.findByCart(cart)
 
         }
         catch{
             throw "usuario no encontrado";
         }
    }

}

export const userService = new UserService()