export const getUserHelper = ({ email }: { email: string }) =>  {
  return `
    SELECT id, email, password
    FROM users 
    WHERE email='${email}'
  `;
};

export const getUserProfileHelper = ({ email }: { email: string }) => {
  return `
    SELECT users.id, users.email 
    FROM users
    INNER JOIN projects as p
     ON (users.id=p.user_id)
     WHERE (users.email=${email})
  `;
}

export const postUserHelper = ({ email, password }: { email: string, password: string }) => {
    return `
      INSERT INTO users (email, password) 
      VALUES ('${email}', '${password}')
      RETURNING id, email, password
    `;
  };
