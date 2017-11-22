import express from 'express';
import bodyParser from 'body-parser';
import dataBase from './config/db';
// import sync from './config/syncTables';
import { success } from './lib/log';
import router from './router';
const middleWare = [
  bodyParser.json({extended: true}),
  bodyParser.urlencoded({extended: true})
]

//whip up instance of express app
const app = express();

//route handlers and middleware
app.use(...middleWare)
app.use('/api', router);

//set port for app instance to listen to
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  success('rest-server listening on port ', PORT);
});
