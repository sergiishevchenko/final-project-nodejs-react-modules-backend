import { getPopularRecipes, createRecipe, deleteRecipe, getUserRecipesService } from "../services/recipesServices.js";
import Recipes from "../db/models/Recipes.js";
import Categories from "../db/models/Categories.js";
import Ingredients from "../db/models/Ingredients.js";
import Areas from "../db/models/Areas.js";
import RecipesIngredients from "../db/models/RecipesIngredients.js";
import getPagination from "../helpers/getPagination.js";
import { Op } from "sequelize";
import fs from "node:fs/promises";
import cloudinary from "../helpers/cloudinary.js";
import HttpError from "../helpers/HttpError.js";
import { recipeSchema } from "../schemas/recipeSchemas.js";

/**
 * Отримання популярних рецептів
 */
export const getPopular = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const recipes = await getPopularRecipes(limit);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Додавання нового рецепта
 */
export const addRecipe = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const recipeData = { ...req.body };

        if (typeof recipeData.ingredients === 'string') {
            try {
                recipeData.ingredients = JSON.parse(recipeData.ingredients);
            } catch (error) {
                throw HttpError(400, "Invalid ingredients format");
            }
        }

        const { error } = recipeSchema.validate(recipeData);
        if (error) {
            throw HttpError(400, error.message);
        }

        if (req.file) {
            const { url } = await cloudinary.uploader.upload(req.file.path, {
                folder: "thumb-recipes",
                use_filename: true,
            });
            recipeData.thumb = url;

            await fs.unlink(req.file.path);
        } else if (!recipeData.thumb) {
            throw HttpError(400, "Recipe thumbnail is required");
        }

        const newRecipe = await createRecipe(recipeData, userId);
        res.status(201).json(newRecipe);
    } catch (error) {
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.error("Failed to delete temp file:", unlinkError);
            }
        }
        res.status(error.status || 500).json({ message: error.message });
    }
};


/**
 * Видалення рецепта
 */
export const removeRecipe = async (req, res) => {
    try {
        const { id: recipeId } = req.params;
        const { id: userId } = req.user;
        const result = await deleteRecipe(recipeId, userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
          
/**
 * Отримання рецепта за ID (публічний)
 */
export const getRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const recipe = await Recipes.findByPk(id, {
            include: [
                {
                    model: Categories,
                    as: "category",
                    attributes: ["name"],
                },
                {
                    model: Areas,
                    as: "area",
                    attributes: ["name"],
                },
                {
                    model: Ingredients,
                    through: {
                        model: RecipesIngredients,
                        attributes: ["measure"],
                    },
                    as: "ingredients",
                },
            ],
        });

        if (!recipe) {
            throw HttpError(404, "Recipe not found");
        }

        res.json({
            status: "success",
            data: {
                id: recipe.id,
                title: recipe.title,
                category: recipe.category?.name,
                area: recipe.area?.name,
                description: recipe.description,
                instructions: recipe.instructions,
                thumb: recipe.thumb,
                time: recipe.time,
                ingredients: recipe.ingredients.map((ing) => ({
                    id: ing.id,
                    name: ing.name,
                    measure: ing.recipe_ingredient.measure,
                    img: ing.img,
                    desc: ing.desc,
                })),
            },
        });
    } catch (error) {
        next(error);
    }
};
          
/**
 * Отримання власних рецептів користувача (приватний)
 */
export const getMyRecipes = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const myRecipes = await Recipes.findAll({
            where: { ownerId: userId },
        });

        if (!myRecipes.length) {
            throw HttpError(404, "You have no recipes");
        }

        res.json({
            status: "success",
            data: myRecipes,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Пошук рецептів за фільтрами (категорія, інгредієнт, регіон)
 */
export const searchRecipes = async (req, res) => {
    const { category, ingredient, area, page, limit:size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const whereClause = {};
    const include = [];

    if (category) {
        const categoryRecord = await Categories.findOne({ where: { name: category } });
        if (categoryRecord) {
            whereClause.categoryId = categoryRecord.id;
        }
    } 
    
    if (area) {
        const areaRecord = await Areas.findOne({ where: { name: area } });
        if (areaRecord) {
            whereClause.areaId = areaRecord.id;
        }
    } 

    if (ingredient) {
        const ingredientRecord = await Ingredients.findOne({ where: { name: ingredient } });
        if (ingredientRecord) {
            const recipeIds = await RecipesIngredients.findAll({
                where: { ingredientId: ingredientRecord.id },
                attributes: ['recipeId']
            });
          
            if (recipeIds.length > 0) {
                whereClause.id = { [Op.in]: recipeIds.map(item => item.recipeId) };
            } else {
                return res.json({
                    totalItems: 0,
                    recipes: [],
                    totalPages: 0,
                    currentPage: page ? +page : 0,
                });
            }
        }
    }
            
    const { count, rows } = await Recipes.findAndCountAll({
        where: whereClause,
        include: include.length > 0 ? include : undefined,
        limit,
        offset,
    });
    res.json({
        totalItems: count,
        recipes: rows,
        totalPages: limit > 0 ? Math.ceil(count / limit) : 1,
        currentPage: page ? +page : 1,
    });
};

export const getUserRecipes = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const { count, recipes, page: currentPage, limit: perPage } = await getUserRecipesService(userId, page, limit);

        if (!recipes.length) {
            throw HttpError(404, "This user has no recipes");
        }

        res.json({
            status: "success",
            data: recipes,
            pagination: {
                total: count,
                page: currentPage,
                totalPages: Math.ceil(count / perPage),
                limit: perPage,
            },
        });
    } catch (error) {
        next(error);
    }
};
