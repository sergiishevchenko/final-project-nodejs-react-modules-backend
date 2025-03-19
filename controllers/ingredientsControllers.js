import ctrlWrapper from "../helpers/ctrlWrapper.js";
import getIngredients from "../services/ingredientsServices.js";

const getAllIngredients = async (req, res) => {
  const { page = 1, limit = 600 } = req.query;
  const result = await getIngredients({}, { page, limit });
  res.json(result);
};

export default ctrlWrapper(getAllIngredients);
