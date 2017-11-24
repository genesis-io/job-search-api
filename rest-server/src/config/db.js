import mysql from 'mysql';
import { success, error } from '../lib/log'
import Promise from 'bluebird';

require('dotenv').config();

let options = {
  db: process.env.NODE_ENV === 'test' ? process.env.DATABASETEST : process.env.DATABASE
}

const dataBase = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: options.db
});

dataBase.connect(err => {
  if (err) {
    error('error connecting to the database');
    throw err
  }
  success(`successfully connected to the database!,  ${options.db}`)
});

Promise.promisifyAll(dataBase);

export default dataBase;