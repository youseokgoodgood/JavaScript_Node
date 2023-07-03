import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send(`running`);
});

AppDataSource.initialize()
  .then(() => {
    console.log(`성공`);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server Ruuning at Port ${PORT}`);
});
