const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secretText = "tladbtjr123";
const refreshSecretText = "torri123";
const PORT = 4000;
const posts = [
  {
    username: "John",
    title: "Post 1",
  },
  {
    username: "Han",
    title: "Post 2",
  },
];

let resfreshTokens = [];

function authMiddleware(req, res, next) {
  //토큰을 request header에서 가져오기
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null && token === undefined) {
    return res.sendStatus(401);
  } else {
    //jwt 토큰이 유효한지 확인
    jwt.verify(token, secretText, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.user = user;
        next(); //다음 미들웨어로 넘어가기 위함
      }
    });
  }
}

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  console.log(`Auth Project`);
  res.status(201).send(`통신 성공`);
});

app.get("/refresh", (req, res) => {
  console.log("111");
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(403);

  const refreshtoken = cookies.jwt;

  if (!refreshtoken.includes(refreshtoken[0])) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshtoken[0], refreshSecretText, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ name: user.name }, secretText, {
      expiresIn: "30s",
    });
    res.json({ accessToken: accessToken });
  });

  console.log(`req.cookies`, req.cookies);
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  //jwt를 이용하여 토큰 생성 하기
  // 유효기간 추가
  const accessToken = jwt.sign(user, secretText, { expiresIn: "30s" });

  //jwt를 이용해서 refreshtoken도 생성 refreshSecretText

  const refreshAccessToken = jwt.sign(user, refreshSecretText, {
    expiresIn: "1d",
  }); //원래 db에 저장함

  resfreshTokens.push(refreshAccessToken);

  //resfreshTokens를 쿠키에 저장
  res.cookie("jwt", resfreshTokens, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken: accessToken });
});

app.get("/posts", authMiddleware, (req, res) => {
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
