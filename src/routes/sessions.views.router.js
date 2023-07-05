import Express from "express";
//import { users } from "../services/userService.js";
import { isUser } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/auth.js";

export const sessionsViewsRouter= Express.Router()

sessionsViewsRouter.get('/register', (req, res) => {

    res.render('register')

})

sessionsViewsRouter.get('/login', (req, res) => {
   res.render('login')
});

sessionsViewsRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ status: 'session eliminar ERROR' });
        }
        res.redirect('../../');
    });
});

sessionsViewsRouter.get('/profile', isUser, (req, res) => {
    res.render('profile');
});
  
sessionsViewsRouter.get('/admin', isAdmin, (req, res) => {
    res.render('admin');
});