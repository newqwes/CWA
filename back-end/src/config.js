import express from 'express';
import { Server } from 'http';
import useSocket from 'socket.io';
import Bank from './database/models/bank';

export const app = express();
export const server = Server(app);
export const io = useSocket(server, { cors: { origin: '*' } });

io.on('connection', async (socket) => {
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
});
