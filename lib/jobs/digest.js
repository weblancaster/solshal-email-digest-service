'use strict';

const moment = require('moment');
const _ = require('lodash');
const SparkPost = require('sparkpost');
const config = require('../config/index');
const digestTemplate = require('../template/index');
let emailHighlight = require('../config/constants').emailHighlight;

const sender = new SparkPost(config.email.API_KEY);

function sendCustomizedEmail(user) {
  let emailHighlight = `, ${emailHighlight}`;

  if (user.collections.length > 1) {
    emailHighlight = "your weekly reading is ready.";
  }

  sender.transmissions.send({
    options: {
      open_tracking: true,
      click_tracking: true
    },
    content: {
      from: 'hello@solshal.com',
      subject: `Hey! ${user.name} ${emailHighlight}`,
      reply_to: 'hello@solshal.com',
      html: digestTemplate(user)
    },
    recipients: [
      {
        address: `${user.email}`,
        name: `${user.name}`
      }
    ]
  })
    .then(data => {
      console.log(`Email sent to ${user.email}!`);
      console.log(data);
    })
    .catch(err => {
      console.log('Something went wrong');
      console.log(err);
    });
}

function digestCollection(db) {
  const users = db.collection('users');

  users
    .find({}, {
      _id: 0,
      password: 0,
      salt: 0,
      last_online: 0,
      created_at: 0,
      __v: 0
    })
    .filter({
      is_pro: true,
      digest: true
    })
    .toArray()
    .then((users) => {
      let formattedUsers, userCollections, flattenedUserCollection;

      formattedUsers = _.map(users, (user) => {
        userCollections = _.map(user.folders, (folder) => {
          return folder.collections;
        });
        flattenedUserCollection = _.filter(_.flattenDeep(userCollections), (collection) => {
          // collection created date is newer than 7 days ago?
          return +collection.created_at > moment(Date.now()).subtract(7, 'days').format('x');
        });

        _.assign(user, {
          collections: flattenedUserCollection
        });

        // no need to keep folders in the object
        // so remove
        delete user.folders;

        return user;
      });

      _.forEach(formattedUsers, (user) => {
        sendCustomizedEmail(user)
      });

      // exit process after 10 secs
      // so if any request is active after the sendCustomizedEmail is called
      // perhaps will be done before the timeout/exit
      setTimeout(() => {
        console.log("forced exit");
        process.exit();
      }, 10000);
    });
}

module.exports = digestCollection;
