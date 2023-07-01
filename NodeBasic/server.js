const express = require("express");
const usersRouters = require("./routes/users.router");
const postsRouters = require("./routes/posts.router");
const PORT = 4000;
const app = express();
const path = require("path");
const { error } = require("console");
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.baseUrl}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${diffTime}ms`);
});

//에러 강제 발생
app.get("/", (req, res, next) => {
  //일반에러 강제 발생
  //throw new Error("it is an error");

  //비동기를 이용한 에러강제 발생
  //비동기 경우 에러 처리기를 사용 하기 위해선 next()를 사용해야함
  setImmediate(() => {
    next(new Error("it is an error"));
  });
  //res.send("Hello, worold!");
});

//에러 처리기
app.use((error, req, res, next) => {
  res.json({ message: error.message });
});

app.use("/users", usersRouters);
app.use("/posts", postsRouters);

app.listen(PORT, () => {
  console.log(`PORT ${PORT}`);
});
