import { Router } from "express";

import getAllIngredients from "../controllers/ingredientsControllers.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const ingredientsRouter = Router();

ingredientsRouter.get("/", ctrlWrapper(getAllIngredients));

export default ingredientsRouter;