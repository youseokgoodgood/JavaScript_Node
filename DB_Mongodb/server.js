const express = require("express");
const usersRouters = require("./routes/users.router");
const postsRouters = require("./routes/posts.router");
const PORT = 4000;
const app = express();
const path = require("path");
const { default: mongoose } = require("mongoose");
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

mongoose
  .connect(
    "mongodb+srv://wnsghrnt2586:MMqxz0x1eRkYwwls@express-cluster.zasrnei.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connect Success"))
  .catch((err) => console.error(err));

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
