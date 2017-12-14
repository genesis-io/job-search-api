require('dotenv').config();
require('dotenv').load();

import * as request from 'supertest';

import {
  dropUserTables,
  syncUserTables,
  dropProjectTables,
  syncProjectTables,
} from '../../../lib/SQL/sqlScripts';
import {
  findUserUrl,
  signupUrl
} from '../../../config/test/testGlobals';
import { error } from '../../../lib/log';
import app from '../../../config/express';

let token;

beforeAll(async () => {
  await dropProjectTables();
  await dropUserTables();
  await syncUserTables();
  await syncProjectTables();
  token = await request(app)
    .post(signupUrl)
    .send({ email: 'newuser@gmail.com', password: 'howdy17' })
    .then(response => token = response.header.authorization);
});

describe('/api/users integration test', () => {
  test('should be able to find a user if they just saved them', async () => {
    expect.assertions(2);
    await request(app)
      .post(signupUrl)
      .send({ email: 'test@gmail.com', password: 'horwdy17' })
    const { body, statusCode } = await request(app)
      .get(`${findUserUrl}/test@gmail.com`)
      .set('authorization', token)
    expect(body[0].email).toBe('test@gmail.com');
    expect(statusCode).toBe(200); 
  });
});