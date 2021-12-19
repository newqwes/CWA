import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export default cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
});
