'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('./lib/config/index');
const digestCollection = require('./lib/jobs/digest');

// DB setup/start
const uriDBString = config[process.env.NODE_ENV].db.uri;

MongoClient.connect(uriDBString, config.dbOptions, (err, db) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  digestCollection(db);
});

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
    process.exit(1);
  }
}

process.on('exit', exitHandler.bind(null, { exit: true }));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));