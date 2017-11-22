export default class UserHelpers {
  static createTable() {
    return `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(60))`
  }
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