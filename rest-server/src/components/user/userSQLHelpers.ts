export const getUserHelper = ({ email }: { email: string }) =>  {
  return `
    SELECT id, email, password
    FROM users 
    WHERE email='${email}'
  `;
};

export const postUserHelper = ({ email, password }: { email: string, password: string }) => {
    return `
      INSERT INTO users (email, password) 
      VALUES ('${email}', '${password}')
      RETURNING id, email, password
    `;
  };
