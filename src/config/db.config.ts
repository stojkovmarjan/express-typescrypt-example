import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "sequelize_test",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "#Ubuntu#1",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
  }
);

export default sequelize;
