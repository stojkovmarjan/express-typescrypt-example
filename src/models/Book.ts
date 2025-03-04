import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import Author from './Author';

class Book extends Model {
  public id!: number;
  public title!: string;
  public price!: number;
  public authorId!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 25],
          msg: "Title must be between 2 and 25 characters long",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [0,],
          msg: "Price must be a positive number",
        },
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Authors', // table name, not model name
        key: 'id',
    },
  },
},
  {
    sequelize,
    modelName: 'Book',
    //tableName: 'books_table', // if we want a different table name
  }

);
// Define the association
Book.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasMany(Book, { foreignKey: 'authorId' });
export default Book;
