import cookieSession from 'cookie-session';
import dotenv from 'dotenv';

dotenv.config();

export default cookieSession({
  maxAge: 15 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
});
