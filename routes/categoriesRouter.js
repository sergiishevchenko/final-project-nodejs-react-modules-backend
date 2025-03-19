import { Router } from "express";

import getAllCategories from "../controllers/categoriesControllers.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);

export default categoriesRouter;