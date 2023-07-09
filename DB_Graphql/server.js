const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();
const PORT = 4000;
const schema = buildSchema(`
    type Query{
        description: String
    }
`);

//graphql schema에서 지정한 키값에 대한 응답값 설정
const root = {
  description: "hello world",
};

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.baseUrl}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${diffTime}ms`);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
  })
);

app.get("/", (req, res) => {
  console.log(`서버동작완료`);
  res.status(201).send(`서버동작완료`);
});

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
});
