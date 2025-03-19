import { getPopularRecipes, createRecipe, deleteRecipe } from "../services/recipesServices.js";

export const getPopular = async (req, res) => {
    const { limit = 10 } = req.query;
    const recipes = await getPopularRecipes(limit);
    res.json(recipes);
};

export const addRecipe = async (req, res) => {
    const { id: userId } = req.user;
    const newRecipe = await createRecipe(req.body, userId);
    res.status(201).json(newRecipe);
};

export const removeRecipe = async (req, res) => {
    const { id: recipeId } = req.params;
    const { id: userId } = req.user;

    const result = await deleteRecipe(recipeId, userId);
    res.json(result);
};