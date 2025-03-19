import express from "express";
import { getPopular, addRecipe, removeRecipe, searchRecipes } from "../controllers/recipesControllers.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { recipeSchema } from "../schemas/recipeSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const recipesRouter = express.Router();

recipesRouter.get("/popular", ctrlWrapper(getPopular));
recipesRouter.get("/", ctrlWrapper(searchRecipes));
recipesRouter.post("/", authenticate, validateBody(recipeSchema), ctrlWrapper(addRecipe));
recipesRouter.delete("/:id", authenticate, ctrlWrapper(removeRecipe));

export default recipesRouter;
