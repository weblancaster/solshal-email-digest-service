'use strict';

function digestCollection(db) {
  const users = db.collection('users');

  users
    .find({})
    .filter({
      is_pro: true
    })
    .toArray()
    .then((users) => {
      console.log('users', users);
      db.close()
    });
}

module.exports = digestCollection;