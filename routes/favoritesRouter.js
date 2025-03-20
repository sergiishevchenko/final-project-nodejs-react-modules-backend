import express from 'express';
import {
    addFavoriteRecipe,
    removeFavoriteRecipe,
    getFavoriteRecipes,
} from '../controllers/favoritesController.js';
import authenticate from '../middlewares/authenticate.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const favoritesRouter = express.Router();

favoritesRouter.post(
    '/recipes/:recipeId',
    authenticate,
    ctrlWrapper(addFavoriteRecipe)
);
favoritesRouter.delete(
    '/recipes/:recipeId',
    authenticate,
    ctrlWrapper(removeFavoriteRecipe)
);
favoritesRouter.get('/recipes', authenticate, ctrlWrapper(getFavoriteRecipes));

export default favoritesRouter;
