export const getUser = email =>  `SELECT * FROM users WHERE email='${email}'` ;

export const postUser = (email, password) => {
    return `
    INSERT INTO users (email, password) 
    VALUES ('${email}', '${password}')
    `
  }
