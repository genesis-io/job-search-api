import dataBase from '../../config/db';

import { 
  getUser,
  postUser
} from './userHelpers';
import { error } from '../../lib/log';

export const findUser = async (email: string) => {
  try {
    const queryString = getUser(email);
    const result = await dataBase.queryAsync(queryString);
    return result;
  } catch(e) {
    error(e);
    throw new Error(e);
  }
};

export const saveUser = async (email: string, password: string) => {
  try {
    const queryString = postUser(email, password);
    const result = await dataBase.queryAsync(queryString);
    return result;
    } catch(e) {
      error(e);
      throw new Error(e);
    }
  };
