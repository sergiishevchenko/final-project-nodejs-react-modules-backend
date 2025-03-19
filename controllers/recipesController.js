import Recipes from "../db/models/Recipes.js";
import Categories from "../db/models/Categories.js";
import Ingredients from "../db/models/Ingredients.js";
import Areas from "../db/models/Areas.js";
import RecipesIngredients from "../db/models/RecipesIngredients.js";
import getPagination from "../helpers/getPagination.js";
import HttpError from "../helpers/HttpError.js";

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
export const searchRecipes = async (req, res, next) => {
    try {
        const { category, ingredient, area, page, limit: size } = req.query;
        const { limit, offset } = getPagination(page, size);

        const whereClause = {};
        const include = [];

        console.log(`Searching recipes with: category=${category}, ingredient=${ingredient}, area=${area}`);

        if (category) {
            const categoryRecord = await Categories.findOne({ where: { name: category } });
            if (categoryRecord) {
                whereClause.categoryId = categoryRecord.id;
            } else {
                throw HttpError(404, "Category not found");
            }
        }

        if (area) {
            const areaRecord = await Areas.findOne({ where: { name: area } });
            if (areaRecord) {
                whereClause.areaId = areaRecord.id;
            } else {
                throw HttpError(404, "Area not found");
            }
        }

        if (ingredient) {
            const ingredientRecord = await Ingredients.findOne({ where: { name: ingredient } });
            if (ingredientRecord) {
                include.push({
                    model: Ingredients,
                    through: {
                        model: RecipesIngredients,
                        where: { ingredientId: ingredientRecord.id },
                    },
                    as: "ingredients",
                });
            } else {
                throw HttpError(404, "Ingredient not found");
            }
        }

        const { count, rows } = await Recipes.findAndCountAll({
            where: whereClause,
            include: include.length > 0 ? include : undefined,
            limit,
            offset,
        });

        if (!rows.length) {
            throw HttpError(404, "No recipes found with given criteria");
        }

        res.json({
            totalItems: count,
            recipes: rows,
            totalPages: limit > 0 ? Math.ceil(count / limit) : 1,
            currentPage: page ? +page : 1,
        });
    } catch (error) {
        next(error);
    }
};
