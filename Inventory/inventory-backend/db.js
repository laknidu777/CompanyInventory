import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const inventoryDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mariadb",
    logging: false,
    pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
  }
);

const monitoringDB = new Sequelize(
  process.env.MONITORING_DB_NAME,
  process.env.MONITORING_DB_USER,
  process.env.MONITORING_DB_PASSWORD,
  {
    host: process.env.MONITORING_DB_HOST,
    port: process.env.MONITORING_DB_PORT,
    dialect: "mariadb",
    logging: false,
    pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
  }
);

export { inventoryDB, monitoringDB };
