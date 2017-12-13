require('dotenv').config();
require('dotenv').load();

import {
  createDatabase,
  useDatabase,
  dropDatabase,
  syncUserTables,
  syncProjectTables
} from '../lib/sqlScripts';

const dbSetup = async () => {
  await dropDatabase();
  await createDatabase();
  await useDatabase();
  await syncUserTables();
  await syncProjectTables();
  process.exit();
}

dbSetup();
