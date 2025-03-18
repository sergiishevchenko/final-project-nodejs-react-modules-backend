import Category from '../db/models/Categories.js';

const getCategories = (pagination = {}) => {
    const { page = 1, limit = 10 } = pagination;
    const normalizedLimit = Number(limit);
    const offset = (Number(page) - 1) * normalizedLimit;
    return Category.findAll({ offset, limit: normalizedLimit });
};

export default getCategories;
