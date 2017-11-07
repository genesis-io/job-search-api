import express from 'express';

import { success } from './lib/log';

const app = express();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  success('socket-server listening on port ', PORT);
});
