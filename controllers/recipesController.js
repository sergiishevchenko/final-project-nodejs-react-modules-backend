import Recipes from "../db/models/Recipes.js";
import FavoriteRecipes from "../db/models/FavoriteRecipes.js";
import { Op } from "sequelize";
import HttpError from "../helpers/HttpError.js";
import sequelize from "../db/sequelize.js";

export const getPopularRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.findAll({
            attributes: [
                "id", "title", "thumb", "description", "category", "area",
                [sequelize.fn("COUNT", sequelize.col("favorite_recipes.recipeId")), "likesCount"]
            ],
            include: [{
                model: FavoriteRecipes,
                attributes: [],
            }],
            group: ["recipe.id"],
            order: [[sequelize.literal("likesCount"), "DESC"]],
            limit: 10
        });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createRecipe = async (req, res) => {
    try {
        const { title, category, area, instructions, description, thumb, time, ingredients } = req.body;
        const owner = req.user.id;

        if (!title || !category || !area || !instructions || !description || !thumb || !time || !ingredients) {
            throw HttpError(400, "All fields are required");
        }

        const newRecipe = await Recipes.create({ title, category, area, instructions, description, thumb, time, owner });

        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const recipe = await Recipes.findOne({ where: { id, owner: userId } });

        if (!recipe) {
            throw HttpError(404, "Recipe not found or not owned by user");
        }

        await recipe.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

