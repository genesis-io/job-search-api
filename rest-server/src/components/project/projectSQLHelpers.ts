export const getProjectsHelper = ({ userId }: { userId: number }): string => {
  return `
    SELECt id, title, description, collaborators, user_id 
    FROM projects
    WHERE user_id=${userId}
  `;
};

export const postProjectHelper = ({ title, description, collaborators, userId }: { title: string, description: string, collaborators: string, userId: number }): string => {
  return `
    INSERT INTO projects (title, description, collaborators, user_id)
    VALUES ('${title}', '${description}', '${collaborators}', ${userId})
    RETURNING id, title, description, collaborators, user_id
  `;
};
