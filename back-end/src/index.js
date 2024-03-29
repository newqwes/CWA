import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import bodyParser from 'body-parser';

import { app, connectNotificationToDatabase, server } from './config';
import sequelize from './database';
import cookieSession from './middleware/cookieSession';
import cors from './middleware/cors';
import limiter from './middleware/limiter';
import passportJWTAndGoogle from './middleware/passport';
import errorMiddleware from './middleware/errorMiddleware';

import authRoute from './routes/authRoute';
import orderRoute from './routes/orderRoute';
import refreshRoute from './routes/refreshRoute';
import userRoute from './routes/userRoute';
import coinRoute from './routes/coinRoute';
import avatarRoute from './routes/avatarRoute';

import runTelegramBotService from './services/telegramBotService';
import HistoryService from './services/historyService';

dotenv.config();

passportJWTAndGoogle(passport);

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use(cookieSession);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);
app.use('/api/refresh', refreshRoute);
app.use('/api/user', userRoute);
app.use('/api/coin', coinRoute);
app.use('/api/avatar', avatarRoute);

app.use(errorMiddleware);

cron.schedule('0 3 * * *', () => { HistoryService.removeDuplicateHistory(); }, {
  timeZone: 'Europe/Minsk'
});
const start = async () => {
  try {
    server.listen(process.env.SERVER_PORT, async () => {
      console.log('GOOGLE_CALLBACK_URL: ', process.env.GOOGLE_CALLBACK_URL);
      console.log(`API_URL ${process.env.API_URL}`);
      console.log(`HOST_NAME ${process.env.HOST_NAME}`);
      console.log(`CLIENT_URL ${process.env.CLIENT_URL}`);
      console.log(`CLIENT_URL_VISUAL ${process.env.CLIENT_URL_VISUAL}`);
      console.log(`Server is listening on port ${process.env.SERVER_PORT}...`);
      await sequelize.authenticate();
      await connectNotificationToDatabase();
      console.log('Database Connected!');
    });

    await runTelegramBotService();
  } catch (e) {
    console.log(e);
  }
};

start();
