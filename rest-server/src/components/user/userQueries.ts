import { globalQueryHelper } from '../../lib/components/globals';
import { 
  getUserHelper,
  postUserHelper
} from './userSQLHelpers';

export const userQuery = async (payload, url) => {
  if (url === '/') {
    return await globalQueryHelper(payload, postUserHelper, 'postUserQuery');
  } else {
    return await globalQueryHelper(payload, getUserHelper, 'getUserQuery');
  }
};
 