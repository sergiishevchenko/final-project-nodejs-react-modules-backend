import Recipes from "../db/models/Recipes.js";
import Categories from "../db/models/Categories.js";
import Ingredients from "../db/models/Ingredients.js";
import Areas from "../db/models/Areas.js";
import RecipesIngredients from "../db/models/RecipesIngredients.js";
import getPagination from "../helpers/getPagination.js";


export const searchRecipes = async (req, res) => {
    const { category, ingredient, area, page, limit: size } = req.query;
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
            include.push({
                model: Ingredients,
                through: {
                    model: RecipesIngredients,
                    where: { ingredientId: ingredientRecord.id },
                },
                as: 'ingredients'
            });
        }
    }

    const { count, rows } = await Recipes.findAndCountAll({
        where: whereClause,
        include: include,
        limit,
        offset,
    });

    res.json({
        totalItems: count,
        recipes: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page ? +page : 0,
    });
};
