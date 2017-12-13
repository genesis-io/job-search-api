require('dotenv').config();
require('dotenv').load();

import {
  createDatabase,
  useDatabase,
  dropDatabase,
  syncUserTables,
  dropUserTables,
  syncProjectTables,
  dropUserTables } from '../lib/sqlScripts';

const dbSetup = async () => {
  await dropDatabase();
  await createDatabase();
  await useDatabase();
  await syncUserTables();
  await syncProjectTables();
  process.exit(1);
}

dbSetup();
