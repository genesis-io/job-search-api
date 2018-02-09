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
import { example } from 'joi';

/**
 *  testProjectObj is the request body sent
 *  modified at the start of each test with invalid characters 
 *  then reset to its default
 */

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

beforeAll(async () => {
  await dropProjectTables();
  await dropUserTables();
  await syncUserTables();
  await syncProjectTables();
  await request(app)
    .post(signupUrl)
    .send({ email: 'newuser@gmail.com', password: 'test' });
});

describe('GET/api/projects joi validation tests', () => {
  // test('checks request params to see if it is a number', async () => {
  //   const { statusCode } = await request(app)
  //     .get(`${projectUrl}/1`)
  //   expect(statusCode).toBe(200);
  // })
})
describe('POST/api/projects joi validation tests', () => {
  test('checks title for any unwanted characters', async () => {
    testProject.title = 'test!@#$%';
    const { statusCode } = await request(app)
      .post(projectUrl)
      .send(testProject);
    testProject.title = 'test';
    expect(statusCode).toBe(400);
  });

  test('checks description for any unwanted characters', async () => {
    testProject.description = 'test!@#$%';
    const { statusCode } = await request(app)
      .post(projectUrl)
      .send(testProject);
    testProject.description = 'test';
    expect(statusCode).toBe(400);
  });

  test('checks collaborators for any unwanted characters', async () => {
    testProject.collaborators = 'test!@#$%';
    const { statusCode } = await request(app)
      .post(projectUrl)
      .send(testProject);
    testProject.collaborators = 'test1, test2, test3';
    expect(statusCode).toBe(400);
  });
  
  test('checks user_id to see if it is a number', async () => {
    testProject.userId = 'test'
    const { statusCode } = await request(app)
      .post(projectUrl)
      .send(testProject);
    testProject.userId = 1;
    expect(statusCode).toBe(400);
  });
  // test('checks user_id to see if it is a number', async () => {
  //   // testProject.userId = 'test'
  //   testProject.userId = 'test';
  //   const { statusCode } = await request(app)
  //     .post(projectUrl)
  //     .send(testProject);
  //   testProject.userId = 1;
  //   expect(statusCode).toBe(200);
  // });
});
