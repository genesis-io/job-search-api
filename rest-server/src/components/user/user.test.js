import request from 'supertest';
import {
  dropTables,
  syncTables
} from "../../lib/sqlScripts";
import {
  findUserUrl,
  signupUrl
} from "../../config/testglobals";
import { error } from '../../lib/log'
import app from '../../config/express';

let token;

beforeAll( async() => {
  await dropTables();
  await syncTables();
  await request(app)
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