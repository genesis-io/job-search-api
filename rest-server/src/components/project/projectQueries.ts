import { globalQueryHelper } from '../../lib/components/globals';
import {
  getProjectsHelper,
  postProjectHelper
} from './projectSQLHelpers';

export const projectQuery = async (payload, url) => {
  if (url === '/') {
    return await globalQueryHelper(payload, postProjectHelper, 'postProjectHelper');
  } else {
    return await globalQueryHelper(payload, getProjectsHelper, 'getProjectsHelper');
  }
};
