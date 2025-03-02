import Book from "./Book";
import sequelize from "../config/db.config";


const db = {
  sequelize,
  Book,
};


export default db;
