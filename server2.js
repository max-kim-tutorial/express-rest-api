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
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get("/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

app.listen(3000, function () {
  console.log("server running");
});

module.exports = app;
