'use strict';

// Obj containing application
// configuration

let mongoPath = (process.env.CONTAINER || process.env.NODE_ENV === "development") ? 'mongo' : 'localhost';

console.log(`mongo path is ${mongoPath} and is running running container ${process.env.CONTAINER} and what env ${process.env.NODE_ENV}`);

const config = {
  email: {
    API_KEY: process.env.SPARKPOST_API_KEY || 'a10fea7729a3da4f4ae272753e099521218645ef'
  },
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
