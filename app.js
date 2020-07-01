const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const user = require("./api/user");

const app = express();

// 테스트시 찍지 않음
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", user);

module.exports = app;
