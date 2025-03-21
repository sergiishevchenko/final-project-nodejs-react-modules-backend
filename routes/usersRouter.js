import express from 'express';

import { getFollowersByUserId, getFollowersForProfile, getFollowingUsers, getUser, getUserDetails } from '../controllers/usersControllers.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';

const usersRouter = express.Router();

usersRouter.get('/current', authenticate, ctrlWrapper(getUser));
usersRouter.get('/following', authenticate, ctrlWrapper(getFollowingUsers));
usersRouter.get('/followers', authenticate, ctrlWrapper(getFollowersForProfile));
usersRouter.get('/:id/followers', ctrlWrapper(getFollowersByUserId));
usersRouter.get('/:id', authenticate, ctrlWrapper(getUserDetails));

export default usersRouter;
