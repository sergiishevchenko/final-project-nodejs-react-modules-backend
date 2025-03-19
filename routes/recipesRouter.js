import { Router } from "express";
import { getPopular, addRecipe, removeRecipe } from "../controllers/recipesControllers.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { recipeSchema } from "../schemas/recipeSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const recipesRouter = Router();


recipesRouter.get("/popular", ctrlWrapper(getPopular));
recipesRouter.get("/", ctrlWrapper(searchRecipes));
recipesRouter.post("/", authenticate, validateBody(recipeSchema), ctrlWrapper(addRecipe));
recipesRouter.delete("/:id", authenticate, ctrlWrapper(removeRecipe));

export default recipesRouter;