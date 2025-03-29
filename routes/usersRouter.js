import express from 'express';

import { follow, getFavoriteRecipes, getFollowersByUserId, getFollowersForProfile, getFollowingUsers, getUser, getUserDetails, getUserRecipes, unfollow } from '../controllers/usersControllers.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';
import { followUserSchema, unfollowUserSchema } from '../schemas/userSchemas.js';
import validateBody from '../helpers/validateBody.js';

const usersRouter = express.Router();

usersRouter.get('/current', authenticate, ctrlWrapper(getUser));
usersRouter.post("/follow", authenticate, validateBody(followUserSchema), ctrlWrapper(follow));
usersRouter.post('/unfollow', authenticate, validateBody(unfollowUserSchema), ctrlWrapper(unfollow));
usersRouter.get('/following', authenticate, ctrlWrapper(getFollowingUsers));
usersRouter.get('/followers', authenticate, ctrlWrapper(getFollowersForProfile));
usersRouter.get('/favorites', authenticate, ctrlWrapper(getFavoriteRecipes));
usersRouter.get("/:id/recipes", authenticate, ctrlWrapper(getUserRecipes));
usersRouter.get('/:id/followers', authenticate, ctrlWrapper(getFollowersByUserId));
usersRouter.get('/:id', authenticate, ctrlWrapper(getUserDetails));

export default usersRouter;
