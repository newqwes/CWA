import dotenv from 'dotenv';

dotenv.config();

export const { HOST_NAME, SERVER_PORT, CLIENT_URL } = process.env;

export const USER_ROLES = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
};
