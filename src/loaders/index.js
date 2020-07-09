const appLoader = require("./appLoader");
const dbLoader = require("./dbLoader");

const loaders = async (app) => {
  await dbLoader();
  appLoader(app);
};

module.exports = loaders;
