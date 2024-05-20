const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

//req.logIn(user)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//client => session => request
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//local auth
const localStrategyConfig = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  (email, password, done) => {
    User.findOne(
      {
        email: email.toLocaleLowerCase(),
      },
      (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found` });
        }

        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);

          if (isMatch) {
            return done(null, user);
          }

          return done(null, false, { msg: 'Invalid email or password.' });
        });
      }
    );
  }
);

passport.use('local', localStrategyConfig);

// google auth
const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback',
    scope: ['email', 'profile'],
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (err, existingUser) => {
      if (err) {
        return done(err);
      }

      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = new User();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;
        user.save((err) => {
          console.log(err);
          if (err) {
            return done(err);
          }
          return done(null, user);
        });
      }
    });
  }
);

passport.use('google', googleStrategyConfig);
