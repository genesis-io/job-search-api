import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

import router from '../../routes';

/**
 * middleware to be loaded into express instance
 */
const middleWare: any[] = [
  helmet(),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
];

class App {
  public express: express.Application;
  
  constructor() {
    this.express = express();
    this.middleWare();
    this.mountRoutes();
  }
  
  private middleWare = (): void => {
    this.express.use(...middleWare);
  }

  private mountRoutes = (): void => {
    this.express.use('/api', router);
  }
}

export default new App().express;
