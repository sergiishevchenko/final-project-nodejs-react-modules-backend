import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import Recipes from "./Recipes.js";
import Ingredients from "./Ingredients.js";

const RecipesIngredients = sequelize.define('recipe_ingredient', {
    recipeId: { type: DataTypes.INTEGER, references: { model: Recipes, key: 'id' } },
    ingredientId: { type: DataTypes.INTEGER, references: { model: Ingredients, key: 'id' } },
    measure: DataTypes.STRING,
});

Recipes.belongsToMany(Ingredients, { through: RecipesIngredients });

// RecipesIngredients.sync();

export default RecipesIngredients;
