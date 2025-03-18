import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import Recipes from "./Recipes.js";
import Ingredients from "./Ingredients.js";

const RecipesIngredients = sequelize.define('recipe_ingredient', {
    measure: DataTypes.STRING
});

Recipes.belongsToMany(Ingredients, { through: RecipesIngredients });
Ingredients.belongsToMany(Recipes, { through: RecipesIngredients });

// RecipesIngredients.sync();

export default RecipesIngredients;
