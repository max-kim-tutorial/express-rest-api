const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("../routers");

const appLoader = (app) => {
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("", router);
};

module.exports = appLoader;
