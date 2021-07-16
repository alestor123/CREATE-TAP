#!/usr/bin/env node
const chalk = require('chalk')
const ct = require('./App')
try {
  console.log(ct(process.argv[2] || './'))
  console.log(chalk.greenBright.bold('Done !!'))
} catch (e) {
  console.log(chalk.redBright.bold('Oops we got a problem'))
  process.exit(1)
}
