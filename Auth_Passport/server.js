require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();
const config = require('config');
const mainRouter = require('./src/routes/main.router');
const usersRouter = require('./src/routes/users.router');
const serverConfig = config.get('server');

app.use(
  cookieSession({
    name: 'cookie-session-name',
    keys: [process.env.COOKIE_ENCRYPTION_KEY],
  })
);

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(function (req, res, next) {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {};
  }

  next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport');

app.use(express.json());

//form태그로 덮여져있는 input 태그 value 값을 서버측에서 받기 위해 아래코드 선언 필요
app.use(express.urlencoded({ extended: false }));

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connect Success'))
  .catch((err) => console.error(err));

app.use('/', mainRouter);
app.use('/auth', usersRouter);

app.listen(serverConfig.port, () => {
  console.log(`listening on port ${serverConfig.port}`);
});
