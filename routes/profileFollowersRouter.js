import { Router } from 'express';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import getFollowersForProfile from '../controllers/profileFollowersController.js';
import authenticate from '../middlewares/authenticate.js';

const profileFollowersRouter = Router();

// Приватний ендпоінт для отримання підписників профілю:
// URL: GET /api/profile-followers
profileFollowersRouter.get('/', authenticate, ctrlWrapper(getFollowersForProfile));

export default profileFollowersRouter;