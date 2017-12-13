const envBuild = {
  'rest-server': [
    'DEBUG=TRUE',
    'NODE_ENV=test',
    'PORT=5000',
    'DB_HOST=localhost',
    'DB_USER=root',
    'DB_PASSWORD=',
    'DATABASE=default',
    'DATABASETEST=defaulttest',
    'JWT_SECRET=default'
  ]
};

module.exports = envBuild;
