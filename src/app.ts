import mysql from "mysql2/promise";
import express, { Application } from "express";
import dotenv from "dotenv";
import db from "./models";
import bookRoutes from "./routes/book.routes";


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", bookRoutes);

async function initializeDatabase() {
  try {
    // Step 1: Connect to MySQL server without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "#Ubuntu#1",
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${
        process.env.DB_NAME || "sequelize_test"
      }\`;`
    );

    await connection.end();
    console.log(`Database "${process.env.DB_NAME}" created or already exists.`);

    db.sequelize.sync({alter: true});
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });
