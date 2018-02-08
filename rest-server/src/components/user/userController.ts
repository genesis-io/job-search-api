import { globalController } from '../../lib/components/globals';
import { userQuery } from './userQueries';

export const userController = globalController(userQuery, 'userController');
