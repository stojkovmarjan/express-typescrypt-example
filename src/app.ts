import express, { Application } from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.routes";
import { initializeDatabase } from "./config/initDb";
import authorRoutes from "./routes/author.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authorRoutes);
app.use("/api", bookRoutes);

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });
