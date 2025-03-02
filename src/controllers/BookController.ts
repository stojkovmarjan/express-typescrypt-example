import { Request, Response } from 'express';
import Book from '../models/Book';

export class BookController {
  async getAllBooks(req: Request, res: Response) {
    const books = await Book.findAll();
    console.log(books);
    res.json(books);
  }

  async getBookById(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  }

  async createBook(req: Request, res: Response) {
    const { title, author, price } = req.body;
    const newBook = await Book.create({ title, author, price });
    res.status(201).json(newBook);
  }

  async updateBook(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.price = req.body.price || book.price;
    await book.save();
    
    res.json(book);
  }

  async deleteBook(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    
    await book.destroy();
    
    res.json({ message: 'Book deleted successfully' });
  }
}
