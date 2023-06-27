import Express from "express";
import { users } from "../services/userService.js";
export const sessionsRouter= Express.Router()

sessionsRouter.post('/register', async (req, res) => {
    try{
        const {name,lastName, mail, password } = req.body;
        if (!name || !lastName || !mail || !password){
            res.send("debe completar todos los datos para registrarse")
        }
        await users.newUser(name,lastName, mail, password )
        req.session.user=mail
        req.session.admin = false;
        res.redirect('../../products')
    }
    catch{
        res.send("error al registrarse")
    }  

  
});

sessionsRouter.get('/register', (req, res) => {

    res.render('register')

})

sessionsRouter.post('/login', async(req, res) => {
    try{  const { mail, password } = req.body;
        if (!mail || !password) {
            return res.send('Todos los campos son requeridos');
        }
        const user = await users.findUser(mail,password)
        req.session.user = user.mail;
        req.session.admin = false;
        res.redirect('../../products')
    }
    catch{
        res.send("error")
    }
});

  sessionsRouter.get('/login', (req, res) => {
    res.render('login')
  });

  sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.json({ status: 'session eliminar ERROR' });
      }
      res.redirect('../../');
    });
  });
  
  function checkLogin(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      return res.status(401).send('error de autorización!');
    }
  }
  
  sessionsRouter.get('/profile', checkLogin, (req, res) => {
    res.send('Todo el perfil');
  });