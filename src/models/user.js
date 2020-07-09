const Sequelize = require("sequelize");

const defineUserModel = (sequelize) => {
  const model = sequelize.define("User", {
    name: { type: Sequelize.STRING, unique: true },
  });
  return model;
};

module.exports = defineUserModel;
