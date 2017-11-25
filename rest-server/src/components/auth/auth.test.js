import request from 'supertest';
import { dropTables, syncTables } from "../../lib/sqlScripts";
import app from '../../config/express';

let url;

beforeAll( async() => {
  await dropTables();
  await syncTables();
  url = '/api/auth/signup';
})

describe('POST/api/auth/signup', () => {
  test('validates email is an actual email', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'notanemail', password: 'password'})
    expect(response.statusCode).toBe(400);
  })
  test('validates password matches custom regex', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'emailthatworks@gmail.com', password: '<script></script>' })
    expect(response.statusCode).toBe(400);
  })
  test('checks if email is present on request', async () => {
    const response = await request(app)
      .post(url)
      .send({ password: 'newpassword' })
    expect(response.statusCode).toBe(422);
  })
  test('checks if password is present on request', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'passworddontexist@gmail.com' })
    expect(response.statusCode).toBe(422);
  })
  test('response to have authorization header with token', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'newtest@gmail.com', password: 'testit' })
    expect(response.statusCode).toBe(200);
    expect(response.header).toHaveProperty('authorization');
  });
  test('does not allow same user to sign up', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'newtest@gmail.com', password: 'testit' })
    expect(response.statusCode).toBe(422);
    expect(response.text).toBe('email exists already');
  });
});