import express from "express";
import { login, logout, register, updateAvatar, follow, unfollow } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import {createUserSchema, loginUserSchema, followUserSchema, unfollowUserSchema} from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import uploadAvatar from "../middlewares/uploadAvatar.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), ctrlWrapper(register));
authRouter.post("/login", validateBody(loginUserSchema), ctrlWrapper(login));
authRouter.post("/logout", authenticate, ctrlWrapper(logout));
authRouter.patch("/avatars", authenticate, uploadAvatar.single("avatar"), ctrlWrapper(updateAvatar));
authRouter.post("/follow", authenticate, validateBody(followUserSchema), ctrlWrapper(follow));
authRouter.post('/unfollow', authenticate, validateBody(unfollowUserSchema), ctrlWrapper(unfollow));

export default authRouter;