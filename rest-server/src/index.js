import http from 'http';
import app from './config/express';
import { success } from './lib/log';
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

//set port for app instance to listen to
server.listen(PORT, () => {
  success('rest-server listening on port ', PORT);
});
