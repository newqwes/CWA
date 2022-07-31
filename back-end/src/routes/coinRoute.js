import express from 'express';

import authMiddleware from '../middleware/authMiddleware';

import { getCoins } from '../controllers/coinController';

const coinRoute = express.Router();

coinRoute.post('/', authMiddleware, getCoins);

export default coinRoute;
