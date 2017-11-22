import user from '../components/user/userController';
import { success, error } from '../lib/log';

export const syncTables = (async() => {
  try {
    const userModel = await user.createUserTable();
  } catch(e) {
    error(e);
  }
})()


