import express from 'express';

import { getUser, getUserDetails } from '../controllers/usersControllers.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';

const usersRouter = express.Router();

usersRouter.get('/current', authenticate, ctrlWrapper(getUser));
usersRouter.get('/:id', authenticate, ctrlWrapper(getUserDetails));

export default usersRouter;
