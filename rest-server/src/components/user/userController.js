import dataBase from '../../config/db';
import UserHelper from './userHelpers'
import { error } from '../../lib/log';

export default class UserController {
  static async createUserTable() {
    const queryString = UserHelper.createTable();
    return dataBase.queryAsync(queryString)
  }
  static async findUser(email) {
    try {
      const queryString = UserHelper.getUser(email);
      return dataBase.queryAsync(queryString);
    } catch(e) {
      error(e);
      throw new Error(e);
    }
  }
  static async saveUser(email, password) {
    try {
      const queryString = UserHelper.postUser(email, password);
      return dataBase.queryAsync(queryString);
    } catch(e) {
      error(e);
      throw new Error(e);
    }
  }
 }