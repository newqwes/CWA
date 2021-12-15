import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import sequelize from './database';
import mwPassport, { googlePassport } from './middleware/passport';
import errorMiddleware from './middleware/errorMiddleware';

import authRoute from './routes/authRoute';
import orderRoute from './routes/orderRoute';
import userRoute from './routes/userRoute';

import { SERVER_PORT } from './constants';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

app.use(passport.initialize());
mwPassport(passport);
googlePassport(passport);

app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);
app.use('/api/user', userRoute);

app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(SERVER_PORT, async () => {
      console.log(`Server is listening on port ${SERVER_PORT}...`);
      await sequelize.authenticate();
      console.log('Database Connected!');
      console.log('process.env.CLIENT_URL: ', process.env.CLIENT_URL);
      console.log('process.env.CLIENT_URL_GOOGLE_SUCCESS: ', process.env.CLIENT_URL_GOOGLE_SUCCESS);
      console.log('process.env.CLIENT_URL_GOOGLE_FAILURE: ', process.env.CLIENT_URL_GOOGLE_FAILURE);
      console.log('process.env.GOOGLE_CALLBACK_URL: ', process.env.GOOGLE_CALLBACK_URL);
      console.log('process.env.API_URL: ', process.env.API_URL);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
