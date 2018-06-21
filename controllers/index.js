const home = require("./home-controller");
const user = require("./user-controllers/user-controller");
const profile = require('./user-controllers/profile-controller');
const story = require('./story-controllers');
const destination = require('./destination-controllers');
const world = require('./world-controllers');

module.exports = {
  home,
  user,
  profile,
  story,
  destination,
  world
};
