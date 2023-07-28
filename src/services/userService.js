import { userModel } from "../DAO/models/users.model.js";
import { createHash} from '../config.js';

class UserService {

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
            userModel.create(newUser)
            return "usuario creado!"
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

}

export const users = new UserService()