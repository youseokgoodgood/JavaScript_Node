const express = require("express");
const usersRouters = require("./routes/users.router");
const postsRouters = require("./routes/posts.router");
const PORT = 4000;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.baseUrl}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${diffTime}ms`);
});

app.get("/", (req, res) => {
  res.send("Hello, worold!");
});

app.use("/users", usersRouters);
app.use("/posts", postsRouters);

app.listen(PORT, () => {
  console.log(`PORT ${PORT}`);
});
