const getCreateStory = require('./create-story').getCreateStory;
const postCreateStory = require('./create-story').postNewStory;
const viewAll = require('./viewAll').viewAll;

module.exports = {
  getCreateStory,
  postCreateStory,
  viewAll
}