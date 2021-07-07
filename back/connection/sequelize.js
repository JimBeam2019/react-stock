const { Sequelize } = require("sequelize");

const logger = require("../config/logger");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.PGDB,
  process.env.PGUSER,
  process.env.PGPASS,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    omitNull: true,
    define: {
      timestamps: false,
    },
    query: {
      raw: true,
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Sequelize connection has been established successfully.");
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
