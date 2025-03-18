import Recipes from "../db/models/Recipes.js";
import Ingredients from "../db/models/Ingredients.js";
import { Op } from "sequelize";
import getPagination from "../helpers/getPagination.js";

export const getRecipes = async (req, res) => {
    const { category, ingredient, area, page = 1, limit = 10 } = req.query;

    const where = {};
    if (category) {
        where.category = { [Op.iLike]: category };
    }
    if (area) {
        where.area = { [Op.iLike]: area };
    }

    const include = [
        {
            model: Ingredients,
            through: { attributes: ["measure"] },
            attributes: ["id", "name", "desc", "img"],
        },
    ];

    if (ingredient) {
        include[0].where = { name: { [Op.iLike]: ingredient } };
    }

    const { limit: queryLimit, offset } = getPagination(page - 1, limit);

    const { count, rows } = await Recipes.findAndCountAll({
        where,
        include,
        limit: queryLimit,
        offset,
        attributes: ["id", "title", "category", "area", "instructions", "description", "thumb", "time"],
    });

    res.json({
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        recipes: rows,
    });
};