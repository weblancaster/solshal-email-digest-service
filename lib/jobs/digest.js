'use strict';

const _ = require('lodash');
const SparkPost = require('sparkpost');
const config = require('../config/index');
const digestTemplate = require('../template/index');

const sender = new SparkPost(config.email.API_KEY);

function sendCustomizedEmail(user) {
  sender.transmissions.send({
    content: {
      from: 'testing@sparkpostbox.com',
      subject: `Hey! ${user.name} your latest bookmarks are ready.`,
      html: digestTemplate(user)
    },
    recipients: [
      {
        address: 'michaell.llancaster@gmail.com',
        name: 'michael lancaster'
      }
    ]
  })
    .then(data => {
      console.log('Woohoo! You just sent your first mailing!');
      console.log(data);
    })
    .catch(err => {
      console.log('Whoops! Something went wrong');
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
      is_pro: true
    })
    .toArray()
    .then((users) => {
      let formattedUsers, userCollections, flattenedUserCollection;

      formattedUsers = _.map(users, (user) => {
        userCollections = _.map(user.folders, (folder) => {
          return folder.collections;
        });
        flattenedUserCollection = _.flattenDeep(userCollections);

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
    });
}

module.exports = digestCollection;