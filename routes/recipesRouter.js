import { Router } from "express";
import recipesController from "../controllers/recipesController.js";
import authenticate from "../middlewares/authenticate.js";

const recipesRouter = Router();

recipesRouter.get("/:id", recipesController.getRecipeById);

recipesRouter.get("/my", authenticate, recipesController.getMyRecipes);

export default recipesRouter;
