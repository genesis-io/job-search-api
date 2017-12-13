require('dotenv').config()
require('dotenv').load()

import * as request from 'supertest';

import {
  dropUserTables,
  syncUserTables,
  dropProjectTables,
  syncProjectTables,
} from '../../lib/sqlScripts';
import {
  findUserUrl,
  signupUrl
} from "../../config/testGlobals";
import { error } from '../../lib/log'
import app from '../../config/express';

let token;

beforeAll(async () => {
  await dropProjectTables();
  await dropUserTables();
  await syncUserTables();
  await syncProjectTables();
  token = await request(app)
    .post(signupUrl)
    .send({ email: 'newuser@gmail.com', password:'howdy17' })
    .then(response => token = response.header.authorization)
})

describe('GET/api/users', async () => {
  test('should return 400 if parameter is not valid email', async () => {
     const response = await request(app)
      .get(`${findUserUrl}/newuser`)
      .set('authorization', token)
      .expect(400)
  });
})
