const createDestination = require("./create");
const getCreate = createDestination.getCreateNewDestination;
const postCreate = createDestination.postCreateNewDestination;
const getAll = require("./all").viewAllDestinationCategories;
const details = require('./details').getDetails;

module.exports = {
  getCreate,
  postCreate,
  getAll,
  details
};
