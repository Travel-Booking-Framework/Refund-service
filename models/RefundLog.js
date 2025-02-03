const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RefundLog = sequelize.define("RefundLog", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = RefundLog;
