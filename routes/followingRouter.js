import { Router } from 'express';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import getFollowingUsers from '../controllers/followingController.js';
import authenticate from '../middlewares/authenticate.js';

const followingRouter = Router();

// Приватний ендпоінт: GET /api/following
followingRouter.get('/', authenticate, ctrlWrapper(getFollowingUsers));

export default followingRouter;
