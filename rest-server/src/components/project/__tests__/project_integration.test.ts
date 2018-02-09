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
  signupUrl,
  projectUrl
} from '../../../config/test/testGlobals';
import app from '../../../config/express';

interface testProjectObj {
  title: string,
  description: string,
  collaborators: string,
  userId: number
};

const testProject: testProjectObj = {
  title: 'test',
  description: 'test',
  collaborators: 'test1, test2, test3',
  userId: 1
};

let token;

beforeAll(async () => {
  await dropProjectTables();
  await dropUserTables();
  await syncUserTables();
  await syncProjectTables();
  token = await request(app)
    .post(signupUrl)
    .send({ email: 'newuser@gmail.com', password: 'test' })
    .then(response => token = response.header.authorization);
});

describe('/api/projects integration test', () => {
  test('should be able save a project and find it in the db', async () => {
    expect.assertions(2);
    await request(app)
      .post(projectUrl)
      .set('authorization', token)
      .send(testProject);
    const { body, statusCode } = await request(app)
      .get(`${projectUrl}/1`)
      .set('authorization', token);
    expect(JSON.stringify(body[0])).toBe(JSON.stringify({
      id: 1,
      title: 'test',
      description: 'test',
      collaborators: 'test1, test2, test3',
      user_id: 1
    }));
    expect(statusCode).toBe(200);      
  });
});