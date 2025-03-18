import Recipes from "../models/Recipes.js";
import Ingredients from "../models/Ingredients.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";


const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.findByPk(id);
  if (!recipe) {
    throw HttpError(404, "Recipe not found");
  }

  const ingredientIds = recipe.ingredientsList.map((ing) => ing.ingredientId);
  const ingredients = await Ingredients.findAll({ where: { id: ingredientIds } });

  const ingredientsWithMeasure = ingredients.map((ing) => {
    const found = recipe.ingredientsList.find((i) => i.ingredientId === ing.id);
    return {
      id: ing.id,
      name: ing.name,
      measure: found ? found.measure : "N/A",
      decs: ing.decs,
      img: ing.img,
    };
  });

  res.json({
    status: "success",
    data: {
      title: recipe.title,
      category: recipe.category,
      owner: recipe.owner,
      area: recipe.area,
      instructions: recipe.instructions,
      description: recipe.description,
      thumb: recipe.thumb,
      time: recipe.time,
      ingredients: ingredientsWithMeasure,
    },
  });
};

const getMyRecipes = async (req, res) => {
  const userId = req.user.id;

  const myRecipes = await Recipes.findAll({
    where: { owner: userId },
  });

  res.json({
    status: "success",
    data: myRecipes,
  });
};

export default {
  getRecipeById: ctrlWrapper(getRecipeById),
  getMyRecipes: ctrlWrapper(getMyRecipes),
};
