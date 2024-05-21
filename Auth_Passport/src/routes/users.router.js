const express = require('express');
const usersRouter = express.Router();
const passport = require('passport');
const User = require('../models/users.model');
const sendMail = require('../mail/mail');

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

    // 회원가입 시 이메일 보내기
    sendMail('wnsghrnt2@naver.com', '심유석', 'welcome');

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
