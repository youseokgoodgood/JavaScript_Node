const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./src/models/users.model');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();
const PORT = 4000;
const cookeEncryptionKey = ['key1', 'key2'];
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require('./src/middlewares/auth');

app.use(
  cookieSession({
    name: 'cookie-session-name',
    keys: cookeEncryptionKey,
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
  .connect(
    'mongodb+srv://wnsghrnt2586:MMqxz0x1eRkYwwls@express-cluster.zasrnei.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB connect Success'))
  .catch((err) => console.error(err));

app.get('/', checkAuthenticated, (req, res) => {
  if (req.user) {
    return res.render('index');
  }
  return res.status(201).send(`통신 성공`);
  //res.status(201).send(`통신 성공`);
});

app.get('/login', checkNotAuthenticated, (req, res, next) => {
  if (!req.user) {
    return res.render('login');
  }
  return res.status(201).send(`통신 성공`);
});

app.post('/login', (req, res, next) => {
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

app.post('/logout', (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect('/login');
  });
});

app.get('/signup', checkNotAuthenticated, (req, res, next) => {
  return res.render('signup');
});

app.post('/signup', async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/auth/google', passport.authenticate('google'));

//user에 대한 세부정보 전달
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
