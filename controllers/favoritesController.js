import HttpError from '../helpers/HttpError.js';
import getPagination from '../helpers/getPagination.js';
import {
    createFavoriteRecipe,
    findAndCountAllFavoriteRecipes,
    findOneFavoriteRecipe,
    findOneRecipeById,
    deleteFavoriteRecipe,
} from '../services/favoriteServices.js';

/**
 * Add a recipe to user's favorites
 */
export const addFavoriteRecipe = async (req, res) => {
    const { id: userId } = req.user;
    const { recipeId } = req.params;
    const recipe = await findOneRecipeById(recipeId);
    if (!recipe) {
        throw HttpError( 404, 'Recipe not found' );
    }
    await createFavoriteRecipe({ userId, recipeId });
    res.status(201).json({ message: 'Recipe added to favorites' });
};

/**
 * Remove a recipe from user's favorites
 */
export const removeFavoriteRecipe = async (req, res) => {
    const { id: userId } = req.user;
    const { recipeId } = req.params;
    const favorite = await findOneFavoriteRecipe({ userId, recipeId });
    if (!favorite) {
        throw HttpError( 404, 'Recipe not in favorites' );
    }
    await deleteFavoriteRecipe({ userId, recipeId });
    res.json({ message: 'Recipe removed from favorites' });
};

/**
 * Get user's favorite recipes
 */
export const getFavoriteRecipes = async (req, res) => {
    const { id: userId } = req.user;
    const { page, limit: size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { count, rows } = await findAndCountAllFavoriteRecipes({
        userId,
        limit,
        offset,
    });
    res.json({
        totalItems: count,
        recipes: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page ? +page : 1,
    });
};
