'use strict';

const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
const config = require('./lib/config/index');
const digestCollection = require('./lib/jobs/digest');

let digestTimer;
const digestDelay = moment.duration(1, 'm').asMilliseconds(); // 1 minute delay

// DB setup/start
const uriDBString = config[process.env.NODE_ENV].db.uri;

MongoClient.connect(uriDBString, config.dbOptions, (err, db) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  startInterval(db);
});

function startInterval(db) {
  digestTimer = setInterval(() => {
    console.log('Starting schedule!');
    digestCollection(db);
  }, digestDelay);
}

// the code below will listen to
// when the application exits
// then clear the interval
function exitHandler(options, err) {
  if (options.cleanup) {
    console.log('clean');
  }
  if (err) {
    console.log(err.stack);
  }
  if (options.exit) {
    process.exit();
  }

  clearInterval(digestTimer);
}

process.on('exit', exitHandler.bind(null, { cleanup: true }));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));