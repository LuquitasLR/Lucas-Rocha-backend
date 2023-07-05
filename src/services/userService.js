import { UserModel } from "../DAO/models/users.model.js";

class userService {

    async newUser (user){
        try{
            UserModel.create(user)
            return "usuario creado!"
        }
        catch{
            throw "error";
        }
    }

    async findUser (mail) {
        try{
           return await UserModel.findOne({mail:mail})

        }
        catch{
            throw "usuario no encontrado";
        }
    }

}

export const users = new userService()