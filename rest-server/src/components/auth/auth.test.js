import request from 'supertest';
import { dropTables, syncTables } from "../../lib/sqlScripts";
import app from '../../config/express';

let signupUrl;
let loginUrl;

beforeAll( async() => {
  await dropTables();
  await syncTables();
  signupUrl = '/api/auth/signup';
  loginUrl = '/api/auth/login';
})

describe('POST/api/auth/signup', () => {
  test('validates email is an actual email', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'notanemail', password: 'password'})
    expect(response.statusCode).toBe(400);
  })
  test('validates password matches custom regex', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'emailthatworks@gmail.com', password: '<script></script>' })
    expect(response.statusCode).toBe(400);
  })
  test('checks if email is present on request', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ password: 'newpassword' })
    expect(response.statusCode).toBe(422);
  })
  test('checks if password is present on request', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'passworddontexist@gmail.com' })
    expect(response.statusCode).toBe(422);
  })
  test('response to have authorization header with token', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'newtest@gmail.com', password: 'testit' })
    expect(response.statusCode).toBe(200);
    expect(response.header).toHaveProperty('authorization');
  });
  test('does not allow same user to sign up', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'newtest@gmail.com', password: 'testit' })
    expect(response.statusCode).toBe(422);
    expect(response.text).toBe('email exists already');
  });
});

describe('POST/api/auth/login', () => {
  test('validates email is an actual email', async () => {
    const response = await request(app)
      .post(loginUrl)
      .send({ email: 'fakeemail', password: 'password' })
    expect(response.statusCode).toBe(400);
  })
  test('validates password matches custom regex', async () => {
    const response = await request(app)
      .post(loginUrl)
      .send({ email: 'fakeemail@fakeemail.com', password: '12' })
    expect(response.statusCode).toBe(400);
  })
})