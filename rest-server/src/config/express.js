import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import router from '../router';
const middleWare = [
  helmet(),
  cors({
  allowedHeaders: 'Content-Type, Authorization',
  methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
  bodyParser.json({extended: true}),
  bodyParser.urlencoded({extended: true}),
]

//whip up instance of express app
const app = express();

//route handlers and middleware
app.use(...middleWare)
app.use('/api', router);


export default app;