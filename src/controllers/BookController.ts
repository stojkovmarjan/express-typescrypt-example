import { Request, Response } from "express";
import Book from "../models/Book";
import Author from "../models/Author";
import { ValidationError } from "sequelize";

export class BookController {
  async getAllBooks(req: Request, res: Response) {
    const books = await Book.findAll({ include: [Author] });
    // console.log(books);
    res.json(books);
  }

  async getBookById(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  }

  async createBook(req: Request, res: Response) {
    const { title, authorId, price } = req.body;
    try {
      const newBook = await Book.create({ title, authorId, price });
      res.status(201).json(newBook);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errors: error.errors.map(e => e.message) });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
    
  }

  async updateBook(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    book.title = req.body.title || book.title;
    book.authorId = req.body.authorId || book.authorId;
    book.price = req.body.price || book.price;
    await book.save();

    res.json(book);
  }

  async deleteBook(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    await book.destroy();

    res.json({ message: "Book deleted successfully" });
  }
}
