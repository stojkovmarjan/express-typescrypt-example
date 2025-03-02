import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';

class Book extends Model {
  public id!: number;
  public title!: string;
  public price!: number;
  public author!: string;
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
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
  }
);

export default Book;
