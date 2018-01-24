import {
  findProjects,
  saveProject
} from './projectQueries';

export const getProjects = async (req: any, res: any, next: any) => {
  const { userId } = req.params;
  try {
    const projects = await findProjects(userId);
    projects.length ? res.status(200).send(projects) : res.status(400).send('no projects found');
  } catch (e) {
    return next(e);
  }
}

export const postProject = async (req: any, res: any, next: any) => {
  const { title, description, collaborators, userId } = req.body;
  try {
    await saveProject(title, description, collaborators, userId);
    return res.status(200).send('project successfully saved');
  } catch (e) {
    return next(e);
  }
}
