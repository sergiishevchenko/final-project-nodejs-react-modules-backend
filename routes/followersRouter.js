import { Router } from 'express';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import getFollowersByUserId from '../controllers/followersController.js';

const followersRouter = Router();

// Маршрут: GET /api/followers/:id
followersRouter.get('/:id', ctrlWrapper(getFollowersByUserId));

export default followersRouter;
