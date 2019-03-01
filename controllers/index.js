const store = require('./store');
const tag = require('./tag');
const user = require('./user');
const auth = require("./auth");
const map = require("./map");
const review = require("./review");

module.exports = controllers = {
  store,
  tag,
  user,
  auth,
  map,
  review
};