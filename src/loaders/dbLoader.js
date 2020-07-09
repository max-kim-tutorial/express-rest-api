const db = require("../models");

// 디비 싱크함수
module.exports = () => {
  const options = {
    force: process.env.NODE_ENV === "test" ? true : false,
  };
  return db.sequelize.sync(options);
};
