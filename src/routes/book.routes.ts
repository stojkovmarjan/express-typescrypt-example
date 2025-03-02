import express, {Router} from "express";
import {BookController} from "../controllers/BookController";

const router = express.Router();
const bookController = new BookController();
//GET: localhost:3000/api/books
router.get("/books", bookController.getAllBooks);

//GET: localhost:3000/api/books/2
router.get("/books/:id", bookController.getBookById);

//POST: localhost:3000/api/books
router.post("/books", bookController.createBook);

//PUT: localhost:3000/api/books/2
router.put("/books/:id", bookController.updateBook);

//DELETE: localhost:3000/api/books/2
router.delete("/books/:id", bookController.deleteBook);

export default router;