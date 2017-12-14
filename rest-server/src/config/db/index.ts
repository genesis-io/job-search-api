import * as mysql from 'mysql';
import * as Promise from 'bluebird';

import {
  success,
  error
} from '../../lib/log';

interface Option {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};
const options: Option = {
  host: process.env.NODE_ENV === 'production' ? process.env.AWS_HOST : process.env.LOCAL_HOST,
  port: process.env.NODE_ENV === 'production' ? parseInt(process.env.AWS_PORT, 10) : parseInt(process.env.LOCAL_PORT, 10),
  user: process.env.NODE_ENV === 'production' ? process.env.AWS_USER : process.env.LOCAL_USER,
  password: process.env.NODE_ENV === 'production' ? process.env.AWS_PASSWORD : process.env.LOCAL_PASSWORD,
  database: process.env.NODE_ENV === 'production' ? process.env.AWS_DATABASE : process.env.LOCAL_DATABASE
};

const dataBase: any = mysql.createConnection({
  host: options.host,
  port: options.port,
  user: options.user,
  password: options.password,
  database: options.database
});

dataBase.connect(err => {
  if (err) {
    error('error connecting to the database');
    throw err
  }
  success(`successfully connected to the database!, ${options.database}`)
});

Promise.promisifyAll(dataBase);

export default dataBase;
