import { globalController } from '../../lib/components/globals';
import { projectQuery } from './projectQueries';

export const projectController = globalController(projectQuery, 'projectController');
