import { Router } from "express";

import getAllIngredients from "../controllers/ingredientsControllers.js";

const ingredientsRouter = Router();

ingredientsRouter.get("/", getAllIngredients);

export default ingredientsRouter;