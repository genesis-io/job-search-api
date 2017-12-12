import dataBase from '../config/db';
import {
  success,
  error
} from './log';

export const dropTables = async () => {
  try {
    const userModel = await dataBase.queryAsync(
      `DROP TABLE users`
    )
    success('succesfully dropped tables');
  } catch(e) {
    error(e);
  }
}

export const syncTables = async () => {
  try {
    const userModel = await dataBase.queryAsync(
      `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(60))`
    )
    success('succesfully created tables');
  } catch(e) {
    error(e);
  }
}


