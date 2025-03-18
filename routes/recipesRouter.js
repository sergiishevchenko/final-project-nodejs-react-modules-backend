import express from "express";
import { getRecipes } from "../controllers/recipesController.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const recipesRouter = express.Router();

recipesRouter.get("/", ctrlWrapper(getRecipes));

export default recipesRouter;