import dotenv from 'dotenv';

dotenv.config();

export const { HOST_NAME, SERVER_PORT } = process.env;

export const LOCAL_SERVER_URL = `http://${HOST_NAME}:${SERVER_PORT}`;

export const USER_ROLES = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
};
