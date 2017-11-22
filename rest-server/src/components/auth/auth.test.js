import request from 'supertest';
import express from 'express';
import auth from '../../components/auth/authController';

const app = express();

app.post('/api/auth/signup', auth.signUp);

describe('POST/api/auth/signup', function() {
  it('respond with json', function() {
    return request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send({email: 'test@test.com', password: 'tester'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        console.log(response);
      })
  });
});