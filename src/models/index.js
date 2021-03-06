const Sequelize = require("sequelize");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config(); //LOAD CONFIG
// 복잡한 쿼리 로직이 필요할때는 models 밑에 entity폴더 만들기

// ORM 정의, 깔려있는 데이터베이스로 하려면 환경변수
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// db 객체에 각 모델.js에서 선언한 모델 객체들 + seqaulize 객체(sync 할때 필요함)
let db = {};

// 모델 등록 : 각 모델은 모델 객체를 리턴하는 함수로 선언
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".js") && file !== "index.js";
  })
  .forEach((file) => {
    const model = require(`./${file}`)(sequelize);
    db[model.name] = model;
  });

// associate는 모델을 인자로 받는 모델 객체의 프로퍼티임.
Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 익스포트
module.exports = db;
