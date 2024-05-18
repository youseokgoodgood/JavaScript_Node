const mongoose = require('mongoose');
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

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //bcrypt compare 비교 필요
  //plain Password => client(사용자가 서버로 보낸 비밀번호), this.password => 데이터베이스에 있는 비밀번호
  if (plainPassword === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }

  return cb({ error: 'error' });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
