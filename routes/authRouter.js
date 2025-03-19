import express from "express";

import { getCurrentUser, login, logout, register, updateAvatar } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { createUserSchema, loginUserSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import uploadAvatar from "../middlewares/uploadAvatar.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), ctrlWrapper(register));

authRouter.post("/login", validateBody(loginUserSchema), ctrlWrapper(login));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.patch("/avatars", authenticate, uploadAvatar.single("avatar"), ctrlWrapper(updateAvatar));

export default authRouter;
