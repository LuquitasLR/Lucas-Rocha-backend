import express from 'express';
import passport from 'passport';
import { isAdmin, isUser } from '../middlewares/auth.js';

export const authRouter = express.Router();

authRouter.get('/session', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
  if (!req.user) {
    return res.render('error-page',{error:'Faltan datos'});
    }
  req.session.user = { _id: req.user._id, mail: req.user.mail, name: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

  return res.redirect("../products");
});

authRouter.get('/failregister', async (req, res) => {
  return res.render('error-page',{error:'Error al registrarse'});
});

authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), (req, res) => {
  if (!req.user) {
    return res.render('error-page',{error:'Credenciales invalidas'});
  }
  req.session.user = { _id: req.user._id, mail: req.user.mail, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role };
  console.log(req.session.user)

  return res.redirect("../products",);
});


authRouter.get('/faillogin', (req, res) => {
  return res.render('error-page',{error:'Error al ingresar a su cuenta'});
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
    }
    return res.redirect('/login');
  });
});

authRouter.get('/perfil', isUser, (req, res) => {
  const user = req.session.user;
  return res.render('profile', { user: user });
});

authRouter.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('datos super secretos');
});