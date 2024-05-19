const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    //일반 로그인을 통한 로그인
    type: String,
    unique: true,
  },
  password: {
    //일반 로그인을 통한 로그인
    type: String,
    minlength: 5,
  },
  googleId: {
    //구글 로그인을 통한 로그인
    type: String,
    unique: true,
    sparse: true, // 세션저장
  },
});

const saltRounds = 10;
userSchema.pre('save', function (next) {
  let user = this;
  // 비밀번호가 변경될 때만
  if (user.isModified('password')) {
    // salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //bcrypt compare 비교 필요
  //plain Password => client(사용자가 서버로 보낸 비밀번호), this.password => 데이터베이스에 있는 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
