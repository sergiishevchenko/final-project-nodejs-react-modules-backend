import { Router } from "express";

import getAllAreas from "../controllers/areasControllers.js";

const areasRouter = Router();

areasRouter.get("/", ctrlWrapper(getAllAreas));

export default areasRouter;
