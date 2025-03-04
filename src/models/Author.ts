import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";

class Author extends Model {
  public id!: number;
  public name!: string;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 25],
          msg: "Name must be between 2 and 25 characters long",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Author",
  }
);

export default Author;
