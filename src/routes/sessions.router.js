import passport from 'passport';
import express from 'express';
import userDTO from '../DAO/DTOs/user.dto.js';
export const sessionsRouter = express.Router();

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  // Successful authentication, redirect home.
  res.redirect('/products');
});

sessionsRouter.get('/show', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

sessionsRouter.get('/current', (req, res) => {
  if (!req.user) {
    return res.render('error-page',{error:'No hay ninguna sesión activa.'});
  }
  else{
    const user = new userDTO (req.session.user)
    res.send(JSON.stringify(user))

  }

});