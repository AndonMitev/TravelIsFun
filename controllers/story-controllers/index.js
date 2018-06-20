const getCreateStory = require('./create').getCreateStory;
const postCreateStory = require('./create').postNewStory;
const viewAll = require('./all').viewAll;
const details = require('./details').storyDetails;
const comment = require('./comment').createComment;

module.exports = {
  getCreateStory,
  postCreateStory,
  viewAll,
  details,
  comment
}