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
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
  }

);
// Define the association
Book.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasMany(Book, { foreignKey: 'authorId' });
export default Book;
