import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.routes";
import authorRoutes from "./routes/author.routes";
import { initializeDatabase } from "./config/initDb";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log request details (can be removed in production)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  console.log("-----------------");
  next();
});

// Middleware to intercept responses
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  res.send = function (body?: any): Response {
    // Modify the response body here if needed
    console.log(`Response Body: ${body}`);
    return originalSend.call(this, body);
  };
  next();
});

// Routes
app.use("/api", authorRoutes);
app.use("/api", bookRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

 
