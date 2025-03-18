import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Recipes = sequelize.define("recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thumb: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ingredientsList: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default Recipes;
