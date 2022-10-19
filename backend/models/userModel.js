const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { sequelize, user } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
      },
    }
  );
  return User;
};
