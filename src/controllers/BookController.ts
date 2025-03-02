import { Request, Response } from "express";
import {Book} from "../models/Book";

let books: Book[] = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" }
];

export class BookController {
    async getAllBooks(req: Request, res: Response) {
        res.json(books);
    }
    async getBookById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const book = books.find((book) => book.id === id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    }

    async createBook(req: Request, res: Response) {
        const newBook: Book = req.body;
        books.push(newBook);
        res.status(201).json(newBook);
    }
    async updateBook(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updatedBook: Book = req.body;
        const index = books.findIndex((book) => book.id === id);
        if (index !== -1) {
            books[index] = updatedBook;
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    }
    async deleteBook(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const index = books.findIndex((book) => book.id === id);
        if (index !== -1) {
            books.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    }
}

