import express from 'express';

import { success } from './lib/log';

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  success('rest-server listening on port ', PORT);
});
