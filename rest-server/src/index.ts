require('dotenv').config();
require('dotenv').load();

import * as http from 'http';
import { request } from 'https';

import app from './config/express';
import './config/db';
import { success } from './lib/log';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

//set port for app instance to listen to
server.listen(PORT, () => {
  success('rest-server listening on port ', PORT);
});

server.on('error', e => {
  server.close();
  server.listen(PORT, () => {
    success('rest-server rebooted');
  });
  // if (e.code === 'EADDRINUSE') {
  //   console.log('Address in use, retrying...');
  //   setTimeout(() => {
  //     server.close();
  //     server.listen(PORT, HOST);
  //   }, 1000);
  // }
});
