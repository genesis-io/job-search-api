import { Pool } from 'pg';
import * as Promise from 'bluebird';

import {
  success,
  error
} from '../../lib/log';

interface Config {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
  max: number;
};
const config: Config = {
  user: process.env.NODE_ENV === 'production' ? process.env.AWS_USER : process.env.LOCAL_USER,
  host: process.env.NODE_ENV === 'production' ? process.env.AWS_HOST : process.env.LOCAL_HOST,
  database: process.env.NODE_ENV === 'production' ? process.env.AWS_DATABASE : process.env.LOCAL_DATABASE,
  password: process.env.NODE_ENV === 'production' ? process.env.AWS_PASSWORD : process.env.LOCAL_PASSWORD,
  port: process.env.NODE_ENV === 'production' ? parseInt(process.env.AWS_PORT, 10) : parseInt(process.env.LOCAL_PORT, 10),
  max: 20
};

const db: any = new Pool(config)

db.on('connect', () => {
  success('successfully connected to pg', config.database);
});

db.on('error', err => {
  error('error in pg ', err);
});

db.connect();

Promise.promisifyAll(db);

export default db;
