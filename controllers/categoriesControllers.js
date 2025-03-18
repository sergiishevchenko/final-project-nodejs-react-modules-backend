import ctrlWrapper from '../helpers/ctrlWrapper.js';
import getCategories from '../services/categoriesServices.js';

const getAllCategories = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const result = await getCategories({ page, limit });
    res.json(result);
};

export default ctrlWrapper(getAllCategories);
