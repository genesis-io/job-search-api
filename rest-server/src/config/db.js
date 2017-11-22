import mysql from 'mysql';
import { success, error } from '../lib/log'
import Promise from 'bluebird';

require('dotenv').config();



const dataBase = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
});

dataBase.connect(err => {
  if (err) {
    error('error connecting to the database');
    throw err
  }
  success('successfully connected to the database!')
});

Promise.promisifyAll(dataBase);

export default dataBase;