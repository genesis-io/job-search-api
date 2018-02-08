require('dotenv').config();
require('dotenv').load();

import  * as request from 'supertest';

import {
  dropUserTables,
  syncUserTables,
  dropProjectTables
} from '../../../lib/SQL/sqlScripts';
import {
  signupUrl,
  loginUrl
} from '../../../config/test/testGlobals';
import app from '../../../config/express';

beforeAll( async() => {
  await dropProjectTables();
  await dropUserTables();
  await syncUserTables();
});

describe('POST/api/auth/signup', () => {

  test('validates email is an actual email', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'notanemail', password: 'password'})
    expect(response.statusCode).toBe(400);
  });

  test('validates password matches custom regex', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'emailthatworks@gmail.com', password: '<script></script>' })
    expect(response.statusCode).toBe(400);
  });

  test('checks if email is present on request', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ password: 'newpassword' })
    expect(response.statusCode).toBe(422);
  });

  test('checks if password is present on request', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({ email: 'passworddontexist@gmail.com' })
    expect(response.statusCode).toBe(422);
  });

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
      .expect(422)
      expect(response.text).toBe('email exists already');
  });
});

describe('POST/api/auth/login', () => {

  test('validates email is an actual email', async () => {
    const response = await request(app)
      .post(loginUrl)
      .send({ email: 'fakeemail', password: 'password' })
      .expect(400);
  })

  test('validates password matches custom regex', async () => {
    const response = await request(app)
      .post(loginUrl)
      .send({ email: 'fakeemail@fakeemail.com', password: '12' })
      .expect(400);
  })

  test('should return 401 if user sends incorrect email', async () => {
    await request(app)
      .post(signupUrl)
      .send({ email: 'jobsearch@gmail.com', password: 'jobsearching'})

    await request(app)
      .post(loginUrl)
      .send({ email: 'jobsearc@gmail.com', password: 'jobsearching' })
      .expect(401)
      .then(response => {
        expect(response.text).toBe('Unauthorized')
      })
  })

  test('should return 401 if user sends incorrect password', async () => {
    await request(app)
      .post(loginUrl)
      .send({ email: 'jobsearch@gmail.com', password: 'jobsearchin' })
      .expect(401)
      .then(response => {
        expect(response.text).toBe('Unauthorized')
      })
  })

  test('should return token if user is authorized', async () => {
    await request(app)
      .post(loginUrl)
      .send({ email: 'jobsearch@gmail.com', password: 'jobsearching' })
      .expect(200)
      .then(response => {
        expect(response.headers).toHaveProperty('authorization')
      })
  })
})