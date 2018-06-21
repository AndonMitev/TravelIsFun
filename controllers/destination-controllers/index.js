const createDestination = require("./create");
const getCreate = createDestination.getCreateNewDestination;
const postCreate = createDestination.postCreateNewDestination;
const getAll = require("./all").viewAllDestinationCategories;
const getDetails = require('./details');
const details = getDetails.getDetails;
const addLike = getDetails.addLike;
const edit = require('./edit');
const getEdit = edit.getEdit;
const postEdit = edit.postEdit;

module.exports = {
  getCreate,
  postCreate,
  getAll,
  details,
  addLike,
  getEdit,
  postEdit
};
