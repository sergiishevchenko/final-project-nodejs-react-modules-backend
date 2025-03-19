import "dotenv/config";
import sequelize from "./db/sequelize.js";
import path from "node:path";
import * as fs from "fs";

import Areas from "./db/models/Areas.js";
import Categories from "./db/models/Categories.js";
import Ingredients from "./db/models/Ingredients.js";
import Recipes from "./db/models/Recipes.js";
import RecipesIngredients from "./db/models/RecipesIngredients.js";
import Testimonials from "./db/models/Testimonials.js";
import Users from "./db/models/Users.js";
import "./db/models/UserFollower.js";

const loadJSON = (fileName) => {
    const filePath = path.join(process.cwd(), "data/mongo", fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};
const importData = async () => {
    try {
        await sequelize.sync({ force: true });

        const categoriesData = loadJSON('categories.json');
        const areasData = loadJSON('areas.json');
        const ingredientsData = loadJSON('ingredients.json');
        const usersData = loadJSON('users.json');
        const testimonialsData = loadJSON('testimonials.json');
        const recipesData = loadJSON('recipes.json');

        const idMap = {
            categories: {},
            areas: {},
            ingredients: {},
            users: {},
            recipes: {},
        };
        
        for (const category of categoriesData) {
            const newCategory = await Categories.create({ name: category.name });
            idMap.categories[category.name] = newCategory.id;
        }

        // Збереження регіонів
        for (const area of areasData) {
            const newArea = await Areas.create({ name: area.name });
            idMap.areas[area.name] = newArea.id;
        }

        // Збереження інгредієнтів
        for (const ingredient of ingredientsData) {
            const newIngredient = await Ingredients.create({
                name: ingredient.name,
                desc: ingredient.desc,
                img: ingredient.img,
            });
            idMap.ingredients[ingredient._id] = newIngredient.id;
        }

        // Збереження користувачів з новими ID
        for (const user of usersData) {
            const newUser = await Users.create({
                name: user.name,
                avatar: user.avatar,
                email: user.email,
                password: 'none',
            });
            idMap.users[user._id.$oid] = newUser.id;
        }

        // Збереження відгуків
        for (const test of testimonialsData) {
            await Testimonials.create({
                testimonial: test.testimonial,
                ownerId: idMap.users[test.owner.$oid] || null,
            });
        }

        // Збереження рецептів із оновленими ID
        for (const recipe of recipesData) {
            const newRecipe = await Recipes.create({
                title: recipe.title,
                description: recipe.description,
                instructions: recipe.instructions,
                thumb: recipe.thumb,
                time: parseInt(recipe.time|'0', 10),
                ownerId: idMap.users[recipe.owner.$oid] || null,
                categoryId: idMap.categories[recipe.category] || null,
                areaId: idMap.areas[recipe.area] || null,
            });

            idMap.recipes[recipe._id.$oid] = newRecipe.id;

            // Додавання зв'язків рецепт ↔ інгредієнти з measure
            if (recipe.ingredients) {
                for (const ing of recipe.ingredients) {
                    if (idMap.ingredients[ing.id]) {
                        await RecipesIngredients.create({
                            recipeId: newRecipe.id,
                            ingredientId: idMap.ingredients[ing.id],
                            measure: ing.measure || '',
                        });
                    }
                }
            }
        }

        console.log('✅ Імпорт успішно завершено!');
    } catch (error) {
        console.error('❌ Помилка імпорту:', error);
    } finally {
        await sequelize.close();
    }
}

importData();