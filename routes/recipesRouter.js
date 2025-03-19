import express from "express";
import { searchRecipes } from "../controllers/recipesController.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const recipesRouter = express.Router();

recipesRouter.get("/", ctrlWrapper(searchRecipes));

export default recipesRouter;