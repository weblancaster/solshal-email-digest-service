'use strict';

// Obj containing application
// configuration

let mongoPath = (process.env.CONTAINER) ? 'mongo' : 'localhost';

const config = {
  dbOptions: {
    db: {
      native_parser: true
    },
    replset: {
      auto_reconnect: false,
      poolSize: 10,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    server: {
      poolSize: 5,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    }
  },
  development: {
    db: {
      uri: `mongodb://${mongoPath}:27017/solshaldb`
    },
    secret: '!solshal@s8'
  },
  production: {
    db: {
      uri: `mongodb://${mongoPath}:27017/solshaldb`
    },
    secret: process.env.SESSION_SECRET
  }
};

module.exports = config;