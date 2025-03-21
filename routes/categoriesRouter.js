import { Router } from "express";

import getAllCategories from "../controllers/categoriesControllers.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const categoriesRouter = Router();

categoriesRouter.get("/", ctrlWrapper(getAllCategories));

export default categoriesRouter;