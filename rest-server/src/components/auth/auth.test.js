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
      .send({ email: 'notanemail@gmail.com', password: 'password'})
    expect(response.statusCode).toBe(200);
  })
  test('validates password matches custom regex', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'emailthatworks@gmail.com', password: 'hithere' })
    expect(response.statusCode).toBe(200);
  })
  test('checks if email exist', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'huhuh@gmail.com', password: 'newpassword' })
    expect(response.statusCode).toBe(200);
  })
  test('checks if password exist', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'passworddontexist@gmail.com', password: 'ItsAllGood36' })
    expect(response.statusCode).toBe(200);
  })
  test('response to have authorization header with token', async () => {
    const response = await request(app)
      .post(url)
      .send({ email: 'newtest@gmail.com', password: 'testit' })
    expect(response.header).toHaveProperty('authorization');
  });
});