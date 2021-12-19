import express from 'express';

import checkLastRefreshDate from '../middleware/checkLastRefreshDate';
import authMiddleware from '../middleware/authMiddleware';
import { refresh } from '../controllers/refreshController';

const refreshRoute = express.Router();

// NOTE: Add Middleware to check whether the user is active or not
refreshRoute.post('/', authMiddleware, checkLastRefreshDate, refresh);

export default refreshRoute;
