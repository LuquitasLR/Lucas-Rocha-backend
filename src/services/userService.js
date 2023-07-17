import { UserModel } from "../DAO/models/users.model.js";
import { createHash, isValidPassword } from '../config.js';

class userService {

    async newUser (firstName, lastName, mail, age, password){
        try{
            const newUser = {
                firstName,
                lastName,
                mail,
                age,
                cart:"",
                password: createHash(password),
                role:"user"
              }
            UserModel.create(newUser)
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