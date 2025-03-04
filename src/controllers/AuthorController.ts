import { Request, Response } from "express";
import Author from "../models/Author";
import Book from "../models/Book";
import { ValidationError } from "sequelize";

export class AuthorController {
  async getAllAuthors(req: Request, res: Response) {
    const authors = await Author.findAll({ include: [Book] });
    // console.log(authors);
    res.json(authors);
  }

  async getAuthorById(req: Request, res: Response) {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }
    res.json(author);
  }

  async createAuthor(req: Request, res: Response) {
    const { name } = req.body;
    
    try {
      const newAuthor = await Author.create({ name });
      res.status(201).json(newAuthor);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errors: error.errors.map(e => e.message) });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
   
  }

  async updateAuthor(req: Request, res: Response) {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    author.name = req.body.name || author.name;
    await author.save();

    res.json(author);
  }

  async deleteAuthor(req: Request, res: Response) {
    const author = await Author.findByPk(req.params.id);

    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    await author.destroy();

    res.json({ message: "Author deleted successfully" });
  }
}
