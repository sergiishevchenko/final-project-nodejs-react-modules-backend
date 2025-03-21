import ctrlWrapper from '../helpers/ctrlWrapper.js';
import getCategories from '../services/categoriesServices.js';

const getAllCategories = async (req, res) => {
    const result = await getCategories();
    res.json(result);
};

export default getAllCategories;
