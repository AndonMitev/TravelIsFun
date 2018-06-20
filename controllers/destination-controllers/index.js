const createDestination = require('./create');
const getCreate = createDestination.getCreateNewDestination;
const postCreate = createDestination.postCreateNewDestination;


module.exports = {
  getCreate,
  postCreate,
  }