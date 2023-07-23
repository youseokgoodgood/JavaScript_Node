const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./src/models/users.model");
const passport = require("passport");
const app = express();
const PORT = 4000;

app.use(express.json());

//form태그로 덮여져있는 input 태그 value 값을 서버측에서 받기 위해 아래코드 선언 필요
app.use(express.urlencoded({ extended: false }));

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());

app.use("/static", express.static(path.join(__dirname, "public")));

mongoose
  .connect(
    "mongodb+srv://wnsghrnt2586:MMqxz0x1eRkYwwls@express-cluster.zasrnei.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connect Success"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  console.log(`Auth Project`);
  res.status(201).send(`통신 성공`);
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.Authenticator("local");
});

app.get("/signup", (req, res, next) => {
  res.render("signup");
});

app.post("/signup", async (req, res, next) => {
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
