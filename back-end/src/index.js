import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import useSocket from 'socket.io';
import { Server } from 'http';
import cookieParser from 'cookie-parser';

import sequelize from './database';
import cookieSession from './middleware/cookieSession';
import cors from './middleware/cors';
import limiter from './middleware/limiter';
import passportJWTAndGoogle from './middleware/passport';
import errorMiddleware from './middleware/errorMiddleware';

import authRoute from './routes/authRoute';
import orderRoute from './routes/orderRoute';
import refreshRoute from './routes/refreshRoute';
// import runTelegramBotService from './services/telegramBotService';

dotenv.config();
const app = express();
const server = Server(app);
const io = useSocket(server);

passportJWTAndGoogle(passport);

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

app.use(errorMiddleware);

io.on('connection', socket => {
  console.log(socket);
});

const start = async () => {
  try {
    server.listen(process.env.SERVER_PORT, async () => {
      console.log(`Server is listening on port ${process.env.SERVER_PORT}...`);
      await sequelize.authenticate();
      console.log('Database Connected!');
      console.log('GOOGLE_CALLBACK_URL: ', process.env.GOOGLE_CALLBACK_URL);
    });

    // await runTelegramBotService();
  } catch (e) {
    console.log(e);
  }
};

start();
