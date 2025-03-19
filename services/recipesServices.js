import Recipes from "../db/models/Recipes.js";
import RecipesIngredients from "../db/models/RecipesIngredients.js";
import HttpError from "../helpers/HttpError.js";
import { Op } from "sequelize";
import sequelize from "../db/sequelize.js";


export const getPopularRecipes = async (limit = 10) => {
    const popularRecipes = await Recipes.findAll({
        order: [["favoriteCount", "DESC"]],
        limit: parseInt(limit, 10)
    });

    return popularRecipes;
};

export const createRecipe = async (recipeData, userId) => {
    const newRecipe = await Recipes.create({
        ...recipeData,
        ownerId: userId
    });

    if (recipeData.ingredients && recipeData.ingredients.length > 0) {
        const ingredientRelations = recipeData.ingredients.map(ingredient => ({
            recipeId: newRecipe.id,
            ingredientId: ingredient.id,
            measure: ingredient.measure || ''
        }));

        await RecipesIngredients.bulkCreate(ingredientRelations);
    }

    return newRecipe;
};


export const deleteRecipe = async (recipeId, userId) => {
    const recipe = await Recipes.findOne({
        where: { id: recipeId, ownerId: userId }
    });

    if (!recipe) {
        throw HttpError(404, "Recipe not found or you do not have permission to delete it");
    }

    await RecipesIngredients.destroy({ where: { recipeId } });
    await recipe.destroy();

    return { message: "Recipe deleted successfully" };
};
