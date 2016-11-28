'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('./lib/config/index');
const digestCollection = require('./lib/jobs/digest');

// DB setup/start
const uriDBString = config[process.env.NODE_ENV].db.uri;

MongoClient.connect(uriDBString, config.dbOptions, (err, db) => {
  if ( err ) {
    console.log(err);
    process.exit(1);
  }

  digestCollection(db);
});