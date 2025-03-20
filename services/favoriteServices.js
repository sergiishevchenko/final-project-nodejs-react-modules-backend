import Recipes from '../db/models/Recipes.js';
import FavoriteRecipes from '../db/models/FavoriteRecipes.js';
import sequelize from '../db/sequelize.js';

export const findOneRecipeById = async (recipeId) => {
    return Recipes.findByPk(recipeId, { attributes: ['recipeId'] });
};

export const deleteFavoriteRecipe = async ({ userId, recipeId }) => {
    return sequelize.transaction(async (transaction) => {
        await FavoriteRecipes.destroy({
            where: { userId, recipeId },
            transaction,
        });

        await Recipes.decrement('favoriteCount', {
            by: 1,
            where: { id: recipeId },
            transaction,
        });
    });
};

export const createFavoriteRecipe = async ({ userId, recipeId }) => {
    return sequelize.transaction(async (transaction) => {
        // Create the favorite recipe entry
        const favorite = await FavoriteRecipes.create(
            { userId, recipeId },
            { transaction }
        );

        await Recipes.increment('favoriteCount', {
            by: 1,
            where: { id: recipeId },
            transaction,
        });

        return favorite;
    });
};

export const findOneFavoriteRecipe = async ({ userId, recipeId }) => {
    return FavoriteRecipes.findOne({
        where: { userId, recipeId },
    });
};

export const findAndCountAllFavoriteRecipes = async ({
    userId,
    limit = 100,
    offset = 0,
}) => {
    const { count, rows } = await FavoriteRecipes.findAndCountAll({
        where: { userId },
        include: {
            model: Recipes,
            as: 'recipe',
        },
        limit,
        offset,
    });

    return { count, rows: rows.map((fav) => fav.recipe) };
};
