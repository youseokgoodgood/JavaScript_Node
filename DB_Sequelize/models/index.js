const Sequelize = require("sequelize");

const dbConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "dkdldhvp789",
  POST: "5432",
  DB: "postgres",
  dialect: "postgres", //현재 사용할 db 라이브러리 입력
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.POST,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);

module.exports = db;
