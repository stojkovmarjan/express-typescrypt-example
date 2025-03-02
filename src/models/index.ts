import Book from "./Book";
import sequelize from "../config/db.config";
import Author from "./Author";


const db = {
  sequelize,
  Author,
  Book,
};


export default db;
