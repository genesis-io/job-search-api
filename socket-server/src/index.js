import http from 'http';
import SocketIO from 'socket.io';

import { success } from './lib/log';

const server = http.createServer();
const io = SocketIO(server);

io.on('connection', (client) => {
  client.on('message', (msg) => {
    success('message event heard');
    client.to().emit('message', msg);
  });
  client.on('video-chat', (video) => {
    success('video-chat even heard');
    client.to().emit('video-chat', video);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  success('socket-server listening on port ', PORT);
});
