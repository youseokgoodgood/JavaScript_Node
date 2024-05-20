const express = require('express');
const usersRouter = express.Router();
const passport = require('passport');
const User = require('../models/users.model');

usersRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ msg: info });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

usersRouter.post('/logout', (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect('/login');
  });
});

usersRouter.post('/signup', async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();
    return res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});

usersRouter.get('/google', passport.authenticate('google'));
//user에 대한 세부정보 전달
usersRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = usersRouter;
