import express from 'express';

import { getUser } from '../controllers/usersControllers.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';

const authRouter = express.Router();

authRouter.get('/current', authenticate, ctrlWrapper(getUser));

export default authRouter;
