const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { json } = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const path = require("path");
const loadedTypes = loadFilesSync("**/*", { extensions: ["graphql"] });
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "**/*.resolvers.js")
);

const startApolloServer = async () => {
  const app = express();
  const PORT = 4000;

  const schema = makeExecutableSchema({
    typeDefs: loadedTypes,
    resolvers: loadedResolvers,
  });

  //graphql 요청을 처리하는 아폴로 서버가 모든 미들웨어 및 객체를 포함
  const apolloServer = new ApolloServer({
    schema,
  });

  //아폴로 서버가 시작할때 까지 대기
  await apolloServer.start();

  //express 서버를 연결하고, 들어오는 request을 처리하는 graphql path
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  app.use(express.json());

  app.use((req, res, next) => {
    const start = Date.now();
    console.log(`${req.method} ${req.baseUrl}`);
    next();
    const diffTime = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl} ${diffTime}ms`);
  });

  app.get("/", (req, res) => {
    console.log(`서버동작완료`);
    res.status(201).send(`서버동작완료`);
  });

  app.listen(PORT, () => {
    console.log(`Running a Apollo server at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
