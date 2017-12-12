import * as mysql from 'mysql';
import * as Promise from 'bluebird';

import {
  success,
  error
} from '../lib/log'

interface Option {
  db: string;
}

const options: Option = {
  db: process.env.NODE_ENV === 'test' ? process.env.DATABASETEST : process.env.DATABASE
}

const dataBase: any = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: options.db
});

dataBase.connect(err => {
  if (err) {
    error('error connecting to the database');
    throw err
  }
  success(`successfully connected to the database!, ${options.db}`)
});

Promise.promisifyAll(dataBase);

export default dataBase;
