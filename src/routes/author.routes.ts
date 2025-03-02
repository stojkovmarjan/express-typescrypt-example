import express, {Router} from "express";
import {AuthorController} from "../controllers/AuthorController";

const router = express.Router();
const authorController = new AuthorController();
//GET: localhost:3000/api/books
router.get("/authors", authorController.getAllAuthors);

//GET: localhost:3000/api/books/2
router.get("/authors/:id", authorController.getAuthorById);

//POST: localhost:3000/api/books
router.post("/authors", authorController.createAuthor);

//PUT: localhost:3000/api/books/2
router.put("/authors/:id", authorController.updateAuthor);

//DELETE: localhost:3000/api/books/2
router.delete("/author/:id", authorController.deleteAuthor);

export default router;