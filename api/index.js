const Sequelize = require("sequelize");
import { development } from "./config";

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: "localhost",
    dialect: "mysql",
    operatorAliases: false,
  }
);

//Synchronisation database
sequelize.sync({});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Model importation / definition
import userModel from "./models/User";
import postModel from "./models/Post";

db.User = userModel(sequelize, Sequelize);
db.Post = postModel(sequelize, Sequelize);

//Models associations
db.User.hasMany(db.Post, { as: "posts", foreignKey: "userId" });
db.Post.belongsTo(db.User, {
  as: "user",
  targetKey: "id",
});

module.exports = db;
