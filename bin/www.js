const app = require("../app");
const syncDb = require("./sync-db");

syncDb().then(() => {
  console.log("디비싱크");
  app.listen(3000, () => {
    console.log("server start");
  });
});
