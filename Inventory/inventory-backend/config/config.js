// config.js
import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mariadb",
    //migrationStoragePath: "./migrations/monitoring",
  },

  monitoring: {  // ✅ Add this for monitoring database
    username: process.env.MONITORING_DB_USER,
    password: process.env.MONITORING_DB_PASSWORD,
    database: process.env.MONITORING_DB_NAME,
    host: process.env.MONITORING_DB_HOST,
    port: Number(process.env.MONITORING_DB_PORT),
    dialect: "mariadb",
    migrationStoragePath: "./migrations/monitoring",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + "_test",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mariadb"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mariadb"
  }
};

// ✅ Correct Export: Remove named exports, keep only default
export default config;