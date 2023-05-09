import socket from '../api/socket';

const socketMiddleware = () => (next) => (action) => {
  if (action.meta && action.meta.socket) {
    socket.emit(action.type, action.payload);
  }
  return next(action);
};

export default socketMiddleware;
