import request from 'supertest';
import {
  dropTables,
  syncTables
} from "../../lib/sqlScripts";
import app from '../../config/express';

describe('POST/api/auth/signup', () => {

  test('validates email is an actual email', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({email: 'notanemail', password: 'password'})
    expect(response.statusCode).toBe(400);
  });
})