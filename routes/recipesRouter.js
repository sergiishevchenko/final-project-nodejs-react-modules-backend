import express from "express";
import { getPopularRecipes } from "../controllers/recipesController.js";
import { createRecipe } from "../controllers/recipesController.js";
import { deleteRecipe } from "../controllers/recipesController.js";
import authenticate from "../middlewares/authenticate.js";

const recipesRouter = express.Router();

recipesRouter.get("/popular", getPopularRecipes);
recipesRouter.post("/", authenticate, createRecipe);
recipesRouter.delete("/:id", authenticate, deleteRecipe);

export default recipesRouter;
