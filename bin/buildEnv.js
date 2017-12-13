const fs = require('fs');
const _ = require('lodash');

const envVariables = require('../config/.env.sample');

const createENVFile = (directory, variables) => {
  _.each(variables, (variable) => {
    fs.appendFileSync(`./${directory}/.env.js`, variable + '\n');
  })
}

const buildEnv = () => {
  _.each(envVariables, (value, key) => {
    fs.writeFileSync(`./${key}/.env.js`, '')
    createENVFile(key, value);
  });
}

buildEnv();
