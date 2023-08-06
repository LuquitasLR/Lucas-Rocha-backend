import {userMongoose} from '../../mongoose/users.mongoose.js'

class UserModel {

    async create(user){
        return await userMongoose.create(user)
    }

    async getUser (mail){
        return await userMongoose.findOne({mail:mail})
    }

    async findById (_id){
        return await userMongoose.findById(_id)
    }

    async deleteUser (_id) {
        return await userMongoose.findByIdAndDelete(_id)
    }


    async update (_id, updatedUser) {
        return await userMongoose.updateOne({_id:_id},updatedUser)

    }
}

export const userModel = new UserModel()