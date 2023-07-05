import Express from "express";
import { users } from "../services/userService.js";
import { createHash } from "../config.js";
import { isValidPassword } from "../config.js";

export const sessionsRouter= Express.Router()

sessionsRouter.post('/register', async (req, res) => {
    try{
        const {name,lastName, mail, password } = req.body;
        if (!name || !lastName || !mail || !password){
            res.render('error-page',{error:'Debe completar todos los datos para registrarse.'})
        }
        await users.newUser({name,lastName, mail, password: createHash(password)})
        req.session.user=mail
        req.session.admin = false;
        res.redirect('../../products')
    }
    catch{
        res.send("error al registrarse")
    }  

  
});

sessionsRouter.post('/login', async(req, res) => {
    try{  const { mail, password } = req.body;
        if (!mail || !password) {
            return res.render('error-page',{error:'Todos los campos son requeridos.'});
        }
        const user = await users.findUser(mail)
        if (user && isValidPassword(password,user.password)){
            req.session.user = user.mail;
            req.session.admin = false;
            res.redirect('../../products')
        }
        
    }
    catch{
        res.send("error")
    }
});
