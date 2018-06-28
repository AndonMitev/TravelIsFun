const getCreateStory = require('./create').getCreateStory;
const postCreateStory = require('./create').postNewStory;
const viewAll = require('./all').viewAll;
const details = require('./details').storyDetails;
const addLike = require('./details').addLike;
const comment = require('./comment').createComment;
const edit = require('./edit');

module.exports = {
  getCreateStory,
  postCreateStory,
  viewAll,
  details,
  addLike,
  comment,
  edit
}