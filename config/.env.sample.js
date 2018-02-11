const envBuild = {
  'rest-server': [
    'DEBUG=TRUE',
    'NODE_ENV=test',
    'PORT=5000',
    'LOCAL_HOST=localhost',
    'LOCAL_PORT=5432',
    'LOCAL_USER=root',
    'LOCAL_PASSWORD=',
    'LOCAL_DATABASE=jobsearchtest',
    'AWS_HOST=',
    'AWS_PORT=',
    'AWS_USER=',
    'AWS_PASSWORD=',
    'AWS_DATABASE=',
    'JWT_SECRET=default'
  ]
};

module.exports = envBuild;
