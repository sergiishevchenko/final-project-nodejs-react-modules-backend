import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Recipes = sequelize.define("recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  areaId: {
    type: DataTypes.INTEGER, 
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

// Recipes.sync()

export default Recipes;
