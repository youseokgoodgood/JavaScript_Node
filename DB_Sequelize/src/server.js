const express = require("express");
const app = express();

app.use(express.json());

const PORT = 4000;

app.use("/", (req, res, next) => {
  console.log(`서버 동작완료`);
  res.send(`서버 동작완료`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
