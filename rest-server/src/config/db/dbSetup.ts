require('dotenv').config();
require('dotenv').load();

import {
  createDatabase,
  useDatabase,
  dropDatabase,
  syncUserTables,
  syncProjectTables,
  dropProjectTables,
  dropUserTables
} from '../../lib/SQL/sqlScripts';

const dbSetup = async () => {
  await dropDatabase();
  await createDatabase();
  await dropProjectTables();
  await dropUserTables();
  await syncUserTables();
  await syncProjectTables();
  process.exit();
};

dbSetup();
