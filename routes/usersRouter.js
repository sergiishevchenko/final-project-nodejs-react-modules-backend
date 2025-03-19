import express from "express";

import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { followUserSchema } from "../schemas/usersSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { follow } from "../controllers/usersController.js";

const usersRouter = express.Router();


usersRouter.post('/follow', authenticate, validateBody(followUserSchema), ctrlWrapper(follow));

export default usersRouter;
