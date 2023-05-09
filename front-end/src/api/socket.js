import io from 'socket.io-client';

const socket = io(process.env.SERVER_URL);

export default socket;
