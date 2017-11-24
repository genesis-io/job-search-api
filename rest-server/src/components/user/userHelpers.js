export default class UserHelpers {
  static getUser(email) {
    return `SELECT * FROM users WHERE email='${email}'`
  }
  static postUser(email, password) {
    return `
    INSERT INTO users (email, password) 
    VALUES ('${email}', '${password}')
    `
  }
}