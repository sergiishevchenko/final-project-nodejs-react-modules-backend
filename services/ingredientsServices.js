import Ingredients from '../db/models/Ingredients.js';

const getIngredients = (query = {},  pagination = {}) => {
  const { page = 1, limit = 10 } = pagination;
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;
  return Ingredients.findAll({ where: query, offset, limit: normalizedLimit });
};

export default getIngredients;