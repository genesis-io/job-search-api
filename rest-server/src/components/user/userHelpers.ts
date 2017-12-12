export const getUser = (email: string) =>  `SELECT * FROM users WHERE email='${email}'` ;

export const postUser = (email: string, password: string) => {
    return `
    INSERT INTO users (email, password) 
    VALUES ('${email}', '${password}')
    `
  };
