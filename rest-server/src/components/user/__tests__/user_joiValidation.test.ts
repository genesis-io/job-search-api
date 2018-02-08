require('dotenv').config()
require('dotenv').load()

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
    .then(response => token = response.header.authorization)
})

describe('GET/api/users', () => {
  test('should return 400 if parameter is not valid email', async () => {
    console.log('token= ', token)
    const response = await request(app)
    .get(`${findUserUrl}/newuser`)
    .set('authorization', token)
    .expect(400)
  });
  
  test('should return the user and 200 if user is found in the db', async () => {
    console.log('token= ', token)
    expect.assertions(2)
    const { body, statusCode } = await request(app)
      .get(`${findUserUrl}/newuser@gmail.com`)
      .set('authorization', token)
    expect(body[0].email).toBe('newuser@gmail.com');
    expect(statusCode).toBe(200);
  });
});
