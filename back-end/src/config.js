import express from 'express';
import { Server } from 'http';
import useSocket from 'socket.io';
import { Client } from 'pg';
import Bank from './database/models/bank';

export const app = express();
export const server = Server(app);
export const io = useSocket(server, { cors: { origin: '*' } });

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export const connectNotificationToDatabase = async () => {
  try {
    await client.connect();
    await client.query('LISTEN bank_update');

    client.on('notification', async (msg) => {
      if (msg.channel === 'bank_update') {
        const updatedValue = parseInt(msg.payload, 10);
        console.log('Значение банка обновлено:', updatedValue);
        io.emit('bank', updatedValue);
      }
    });

    console.log('Подключение к базе данных установлено');
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
  }
};

const handleClientConnection = async (socket) => {
  try {
    const bank = await Bank.findByPk(1);

    if (bank) {
      const { value } = bank;
      socket.emit('bank', value);
    }
  } catch (error) {
    console.error('Ошибка при получении значения банка:', error);
  }

  socket.on('disconnect', () => {
    console.log('WebSocket соединение разорвано:', socket.id);
  });
};

io.on('connection', handleClientConnection);
