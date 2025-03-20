import express from "express";
import {
    getRecipeById,
    getMyRecipes,
    getPopular,
    addRecipe,
    removeRecipe,
    searchRecipes
} from "../controllers/recipesController.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { recipeSchema } from "../schemas/recipeSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import uploadThumb from "../middlewares/uploadThumb.js";

const recipesRouter = express.Router();

recipesRouter.get("/popular", ctrlWrapper(getPopular));
recipesRouter.get("/", ctrlWrapper(searchRecipes));
recipesRouter.get("/my", authenticate, ctrlWrapper(getMyRecipes));
recipesRouter.post(
    "/",
    authenticate,
    uploadThumb.single("thumb"),
    validateBody(recipeSchema),
    ctrlWrapper(addRecipe)
);
recipesRouter.delete("/:id", authenticate, ctrlWrapper(removeRecipe));
recipesRouter.get("/:id", ctrlWrapper(getRecipeById));

export default recipesRouter;