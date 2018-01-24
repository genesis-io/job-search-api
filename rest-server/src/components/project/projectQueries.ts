import dataBase from '../../config/db';

import {
  getProjects,
  postProject
} from './projectSQLHelpers';
import { error } from '../../lib/log';

export const findProjects = async (userId: number) => {
  try {
    const queryString = getProjects(userId);
    const result = dataBase.queryAsync(queryString);
    return result;
  } catch (e) {
    error(e);
  }
}

export const saveProject = async (title: string, description: string, collaborators: string, userId: number) => {
  try {
    const queryString = postProject(title, description, collaborators, userId);
    const result = dataBase.queryAsync(queryString);
    return result;
  } catch (e) {
    error(e);
  }
}
