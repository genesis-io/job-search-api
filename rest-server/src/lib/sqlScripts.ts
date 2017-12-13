import dataBase from '../config/db';
import {
  success,
  error
} from './log';

// creating and using and dropping a database

export const createDatabase = async () => {
  const db = process.env.NODE_ENV === 'test' ? process.env.DATABASETEST : process.env.DATABASE;
  try {
    await dataBase.queryAsync(
      `CREATE DATABASE IF NOT EXISTS ${db}`
    );
    success(`successfully created db, ${db}`);
  } catch (e) {
    error(e);
  }
};

export const useDatabase = async () => {
  const db = process.env.NODE_ENV === 'test' ? process.env.DATABASETEST : process.env.DATABASE;
  try {
    await dataBase.queryAsync(
      `USE ${db}`
    );
    success(`using ${db}`);
  } catch (e) {
    error(e)
  }
};

export const dropDatabase = async () => {
  const db = process.env.NODE_ENV === 'test' ? process.env.DATABASETEST : process.env.DATABASE;
  try {
    await dataBase.queryAsync(
      `DROP DATABASE IF EXISTS ${db}`
    );
    success(`dropping ${db}`);
  } catch (e) {
    error(e)
  }
};

// creating and dropping user table

export const syncUserTables = async () => {
  try {
    await dataBase.queryAsync(
      `CREATE TABLE users 
      (id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255),
      password VARCHAR(60))
      `
    );
    success('succesfully created user tables');
  } catch(e) {
    error(e);
  }
};

export const dropUserTables = async () => {
  try {
    await dataBase.queryAsync(
      `DROP TABLE IF EXISTS users`
    );
    success('succesfully dropped users tables');
  } catch(e) {
    error(e);
  }
};


// creating and dropping project table

export const syncProjectTables = async () => {
  try {
    await dataBase.queryAsync(
      `CREATE TABLE projects
      (id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      description VARCHAR(255),
      collaborators VARCHAR(255),
      user_id INT,
      FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE)`
    );
    success('successfully created project tables')
  } catch (e) {
    error(e);
  }
};

export const dropProjectTables = async () => {
  try {
    await dataBase.queryAsync(
      `DROP TABLE IF EXISTS projects`
    );
    success('succesfully dropped project tables');
  } catch(e) {
    error(e);
  }
};
