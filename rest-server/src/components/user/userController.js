import dataBase from '../../config/db';
import { getUser, postUser } from './userHelpers'
import { error } from '../../lib/log';

export const findUser = async email => {
  try {
    const queryString = getUser(email);
    return dataBase.queryAsync(queryString);
  } catch(e) {
    error(e);
    throw new Error(e);
  }
}

export const saveUser = async (email, password) => {
    try {
      const queryString = postUser(email, password);
      return dataBase.queryAsync(queryString);
    } catch(e) {
      error(e);
      throw new Error(e);
    }
  }
