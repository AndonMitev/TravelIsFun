const home = require("./home-controller");
const user = require("./user-controllers/user-controller");
const profile = require("./user-controllers/profile-controller");
const story = require("./story-controllers");
const category = require("./category-destination-controllers");

module.exports = {
  home,
  user,
  profile,
  story,
  category
};
