const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();
const PORT = 4000;
//! 경우 필수값 설정 사용
const schema = buildSchema(`
    type Query{
        posts: [Post],
        comments:[Comment]
    }

    type Post {
        id: ID!
        title: String!
        description: String!
        comments: [Comment]
    }

    type Comment {
      id: ID!
      text: String!
      likes: Int
    }
`);

//graphql schema에서 지정한 키값에 대한 응답값 설정
const root = {
  posts: [
    {
      id: "post1",
      title: "It is a first post",
      description: "It is a first description",
      comments: [
        {
          id: "comment1",
          text: "It is a first comment",
          likes: 1,
        },
      ],
    },
    {
      id: "post2",
      title: "It is a second post",
      description: "It is a second description",
      comments: [],
    },
  ],
  comments: {
    id: "comment1",
    text: "It is a first comment",
    likes: 1,
  },
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
    graphiql: true, //graphql 테스트 시 사용하면 graphql playgraound처럼 사용 가능
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
