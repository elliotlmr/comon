import db from "../index";

const { DataTypes, Model } = require("sequelize");

class Post extends Model {}

export default (sequelize) =>
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
