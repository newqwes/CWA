import io from 'socket.io-client';
import { baseURL } from './index';

const socket = io(baseURL);

export default socket;
