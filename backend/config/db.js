const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("loginrestapi123", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/userModel")(sequelize, DataTypes);

sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = db;
