import express from "express";
import { 
    getRecipeById, 
    getMyRecipes, 
    getPopular, 
    addRecipe, 
    removeRecipe, 
    searchRecipes,
    removeFavoriteRecipe,
    addFavoriteRecipe,
} from "../controllers/recipesController.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { recipeSchema } from "../schemas/recipeSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import uploadThumb from "../middlewares/uploadThumb.js";

const recipesRouter = express.Router();

recipesRouter.get("/popular", ctrlWrapper(getPopular));  // Отримати популярні рецепти
recipesRouter.get("/", ctrlWrapper(searchRecipes));  // Пошук рецептів
recipesRouter.get("/my", authenticate, ctrlWrapper(getMyRecipes));  // Отримати власні рецепти (приватний)
recipesRouter.post("/", authenticate, uploadThumb.single("thumb"), validateBody(recipeSchema), ctrlWrapper(addRecipe));  // Додати рецепт
recipesRouter.post('/favorites/:id', authenticate, ctrlWrapper(addFavoriteRecipe)
);
recipesRouter.delete('/favorites/:id', authenticate, ctrlWrapper(removeFavoriteRecipe)
);
recipesRouter.delete("/:id", authenticate, ctrlWrapper(removeRecipe));  // Видалити рецепт
recipesRouter.get("/:id", ctrlWrapper(getRecipeById));  // Отримати рецепт за ID (публічний)

export default recipesRouter;