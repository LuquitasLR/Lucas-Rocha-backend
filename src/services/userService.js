import { UserModel } from "../DAO/models/users.model.js";

class userService {

    async newUser (name,lastName,mail,password){
        try{
            const user ={name,lastName,mail,password}
            UserModel.create(user)
            return "usuario creado!"
        }
        catch{
            throw "error";
        }
    }

    async findUser (mail,password) {
        try{
           return await UserModel.findOne({mail:mail,password:password})

        }
        catch{
            throw "usuario no encontrado";
        }
    }

}

export const users = new userService()