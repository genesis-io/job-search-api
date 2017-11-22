import chalk from 'chalk';

require('dotenv').config()

export const success = (...args) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.black.bgGreen.bold(...args));
  }
};

export const warning = (...args) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.black.bgYellow.bold(...args));
  }
};

export const error = (...args) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.black.bgRed.bold(...args));
  }
};

export const log = (...args) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.black.bgWhite.bold(...args));
  }
};
