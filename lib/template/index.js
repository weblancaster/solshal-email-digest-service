const _ = require("lodash");
const collectionsTemplate = require("./collectionsTemplate");
const suggestionTemplate = require("./suggestionTemplate");

const digestTemplate = (user) => {
  if (user.collections.length > 0) {
    return collectionsTemplate(user)
  } else {
    return suggestionTemplate(user);
  }
};

module.exports = digestTemplate;
