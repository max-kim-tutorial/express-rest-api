const express = require("express");
const loaders = require("./loaders");

const app = express();

const startApp = async () => {
  await loaders(app);
  app.listen(3000, () => {
    console.log("server start");
  });
};

module.exports = startApp;
