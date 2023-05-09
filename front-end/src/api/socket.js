import io from 'socket.io-client';

const socket = io('https://coinlitics.space/api/');

export default socket;
