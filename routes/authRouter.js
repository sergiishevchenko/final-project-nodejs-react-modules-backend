import express from "express";

import { getCurrentUser, login, logout, register } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { createUserSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), ctrlWrapper(register));

authRouter.post("/login", validateBody(createUserSchema), ctrlWrapper(login));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrentUser)); //TODO

export default authRouter;
