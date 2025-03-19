import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import Users from "./Users.js";
import Recipes from "./Recipes.js";

const FavoriteRecipes = sequelize.define("favorite_recipe", {});

Users.belongsToMany(Recipes, { through: FavoriteRecipes, foreignKey: "userId" });
Recipes.belongsToMany(Users, { through: FavoriteRecipes, foreignKey: "recipeId" });

// FavoriteRecipes.sync();

export default FavoriteRecipes;
