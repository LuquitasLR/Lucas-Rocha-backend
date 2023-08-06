import fs from 'fs'

class userManager {

    constructor (path) {

        this.path= path
        this.users= []
        const userString= fs.readFileSync(this.path, "utf-8")
        const users = JSON.parse(userString)
        this.users = users

    }

    create (newUser) {
        
        let idMax=0
        this.users.forEach((user) => {
            if (user._id>idMax){
                idMax=user._id
            }
        });
        
        idMax++

        const user = {
            _id: idMax,
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            mail:newUser.mail,
            age:newUser.age,
            cart:newUser.cart,
            password: newUser.password,
            role: newUser.role
        }

        this.users.push(user)
        const userString = JSON.stringify(this.users)
        fs.writeFileSync(this.path, userString)
        return user
        
    }
    
    getUser(mail) {

        return this.users.find((u) => u.mail ==mail)

    }
    findById (_id){
        return  this.users.find((u) => u._id ==_id)
    }

}

export const userModel = new userManager('./src/users.json')