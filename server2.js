const express = require("express");
const morgan = require("morgan");

const app = express();
const users = [
  { id: 1, name: "alice", age: 24 },
  { id: 2, name: "max", age: 21 },
  { id: 3, name: "sandy", age: 29 },
];
app.use(morgan("dev"));

app.get("/users", function (req, res) {
  res.json(users);
});

app.listen(3000, function () {
  console.log("server running");
});

module.exports = app;
