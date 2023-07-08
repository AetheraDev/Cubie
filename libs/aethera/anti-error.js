/*
@ Anti-Error 0.0.2 - Beta 2
@ By: AetheraDev/CubieCloud - aethera@cubiecloud.ml
@ anti-0
*/
let stopErrors = false;
let showErrors = false;
let lastError = null;

function use(value) {
  stopErrors = value;
}

function showErr() {
  showErrors = true;
}

function log(message) {
  if (stopErrors) {
    console.log(message);
  } else {
    console.log('The anti-error is not enabled');
  }
}

function logError(logPath) {
  const fs = require('fs');
  process.on('uncaughtException', function (err) {
    if (stopErrors) {
      if (showErrors) {
        console.error(err);
      }
      console.log('An error was avoided');
      fs.appendFileSync(logPath, `${err}\n`);
      lastError = err;
      return;
    }
    throw err;
  });
}

function getLastError() {
  return lastError;
}

module.exports = {
  use,
  showErr,
  log,
  logError,
  getLastError,
  stoppedLog: 'An error was avoided',
};
