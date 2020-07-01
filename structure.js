const express = require("express");
// 리퀘스트/리스폰스 라인 표시
const morgan = require("morgan");
const app = express();

// 미들웨어
function logger(req, res, next) {
  console.log("i`m logger");
  // 다음로직 실행
  next();
}

function logger2(req, res, next) {
  console.log("i`m logger2");
  // 다음로직 실행
  //   next(new Error("error occured"));
  next();
}

// 에러처리
function errorMw(err, req, res, next) {
  console.log(err.message);
  next();
}

// express 의 req/res는 http의 그것과 좀 다름 => 좀더 쓰기 편하게
app.get("/", function (req, res) {
  res.send("hello world!");
});

app.use(logger);
app.use(logger2);
app.use(morgan("dev"));
app.use(errorMw);

app.listen(3000, function () {
  console.log("server running");
});
