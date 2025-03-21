import express from 'express';

import { follow, getFollowersByUserId, getFollowersForProfile, getFollowingUsers, getUser, getUserDetails, unfollow } from '../controllers/usersControllers.js';
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
usersRouter.get('/:id/followers', ctrlWrapper(getFollowersByUserId));
usersRouter.get('/:id', authenticate, ctrlWrapper(getUserDetails));

export default usersRouter;
