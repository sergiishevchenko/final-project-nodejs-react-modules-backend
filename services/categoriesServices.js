import Category from '../db/models/Categories.js';

const getCategories = () => {
    return Category.findAll();
};

export default getCategories;
