const express = require('express');
const mainRouter = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require('../middlewares/auth');

mainRouter.get('/', checkAuthenticated, (req, res) => {
  if (req.user) {
    return res.render('index');
  }
  return res.status(201).send(`통신 성공`);
  //res.status(201).send(`통신 성공`);
});

mainRouter.get('/login', checkNotAuthenticated, (req, res, next) => {
  if (!req.user) {
    return res.render('login');
  }
  return res.status(201).send(`통신 성공`);
});

mainRouter.get('/signup', checkNotAuthenticated, (req, res, next) => {
  return res.render('signup');
});

module.exports = mainRouter;
