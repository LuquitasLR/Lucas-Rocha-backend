import passport from 'passport';
import { UserModel } from '../DAO/models/users.model.js';
import {users} from '../services/userService.js'
import fetch from 'node-fetch';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import { createHash, isValidPassword } from '../config.js';

const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.d0607712225f11b5',
        clientSecret: '7384715bdbcb531e111b6473232bab7953ffac1f',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
      },
      async (accesToken, _, profile, done) => {
        console.log(profile);
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await users.findUser(profile.email);
          if (!user) {
            const newUser = {
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              mail: profile.email,
              age: 0,
              cart:'',
              password: 'nopass',
              role: 'user',
            };
            let userCreated = await UserModel.create(newUser);
            console.log('User Registration succesful');
            return done(null, userCreated);
          } else {
            console.log('User already exists');
            return done(null, user);
          }
        } catch (e) {
          console.log('Error en auth github');
          console.log(e);
          return done(e);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'mail' }, async (username, password, done) => {
      try {
        const user = await users.findUser(username);
        if (!user) {
          console.log('User Not Found with username (mail) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          console.log('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'mail',
      },
      async (req, username, password, done) => {
        try {
          const { mail, firstName, age, lastName } = req.body;
          const user = await users.findUser(username);
          if (user) {
            console.log('User already exists');
            return done(null, false);
          }

          const newUser = {
            firstName,
            lastName,
            mail,
            age,
            cart:'',
            password: createHash(password),
            role: 'user',
          };
          let userCreated = await UserModel.create(newUser);
          console.log(userCreated);
          console.log('User Registration succesful');
          return done(null, userCreated);
        } catch (e) {
          console.log('Error in register');
          console.log(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
