export const getProjects = (userId: number) => {
  return `
    SELECt * FROM projects
    WHERE user_id=${userId}
  `
};

export const postProject = (title: string, description: string, collaborators: string, userId: number) => {
  return `
    INSERT INTO projects (title, description, collaborators, user_id)
    VALUES ('${title}', '${description}', '${collaborators}', ${userId})
  `
};
