import Recipes from "../db/models/Recipes.js";
import RecipesIngredients from "../db/models/RecipesIngredients.js";
import HttpError from "../helpers/HttpError.js";
import Ingredients from "../db/models/Ingredients.js";
import {Op} from "sequelize";


export const getPopularRecipes = async (limit = 10) => {
    const hasFavorites = await Recipes.findOne({
        where: { favoriteCount: { [Op.gt]: 0 } }

    });

    if (hasFavorites) {
        return await Recipes.findAll({
            order: [["favoriteCount", "DESC"]],
            limit: parseInt(limit, 10)
        });
    } else {
        return await Recipes.findAll({
            order: [["id", "ASC"]],
            limit: 4
        });
    }
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

    const recipeWithIngredients = await Recipes.findByPk(newRecipe.id, {
        include: [
            {
                model: Ingredients,
                through: { attributes: ["measure"] }
            }
        ]
    });

    return {
        id: recipeWithIngredients.id,
        title: recipeWithIngredients.title,
        description: recipeWithIngredients.description,
        instructions: recipeWithIngredients.instructions,
        time: recipeWithIngredients.time,
        categoryId: recipeWithIngredients.categoryId,
        areaId: recipeWithIngredients.areaId,
        thumb: recipeWithIngredients.thumb,
        ingredients: recipeWithIngredients.ingredients.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
            desc: ingredient.desc,
            img: ingredient.img,
            measure: ingredient.recipe_ingredient.measure
        }))
    };
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

export const getUserRecipesService = async (userId, page = 1, limit = 10) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;

    const { count, rows: recipes } = await Recipes.findAndCountAll({
        where: { ownerId: userId },
        limit,
        offset,
    });

    return { count, recipes, page, limit };
};
