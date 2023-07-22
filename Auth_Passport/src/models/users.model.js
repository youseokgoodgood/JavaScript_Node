const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    //일반 로그인을 통한 로그인
    type: String,
    trim: true,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
