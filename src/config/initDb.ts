import db from "../models";
import mysql from "mysql2/promise";
export async function initializeDatabase() {
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
      await db.Author.sync({alter: true});
      await db.Book.sync({alter: true});
      //db.sequelize.sync({alter: true});

      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }