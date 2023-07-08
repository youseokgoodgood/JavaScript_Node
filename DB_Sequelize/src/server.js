const express = require("express");
const app = express();
const db = require("../models");
const User = db.users;

app.use(express.json());

const PORT = 4000;

app.use("/", (req, res, next) => {
  console.log(`서버 동작완료`);
  res.send(`서버 동작완료`);
  next();
});

app.post("/users", (req, res) => {
  const { firstName, lastName, hasCar } = req.body;

  const user = { firstName, lastName, hasCar };

  User.create(user)
    .than((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `유저를 생성하는데 에러가 발생 했습니다.`,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
