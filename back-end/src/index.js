import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

import sequelize from './database';
import mwPassport from './middleware/passport';

import authRoute from './routes/authRoute';
import orderRoute from './routes/orderRoute';
import userRoute from './routes/userRoute';

import { SERVER_PORT } from './constants';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
mwPassport(passport);

app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);
app.use('/api/user', userRoute);

app.listen(SERVER_PORT, async () => {
  console.log(`Server is listening on port ${SERVER_PORT}...`);
  await sequelize.authenticate();
  console.log('Database Connected!');
});
