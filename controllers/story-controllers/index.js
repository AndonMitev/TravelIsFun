const getCreateStory = require('./createStory').getCreateStory;
const postCreateStory = require('./createStory').postNewStory;
const viewAll = require('./allStories').viewAll;
const details = require('./detailsStory').storyDetails;
const addLike = require('./detailsStory').addLike;
const comment = require('./createComment').createComment;
const edit = require('./editStory');
const deleteStory = require('./deleteStory').deleteStory;
const editComment = require('./editComment');
const deleteComment = require('./deleteComment').deleteComment;

module.exports = {
  getCreateStory,
  postCreateStory,
  viewAll,
  details,
  addLike,
  comment,
  edit,
  editComment,
  deleteComment,
  deleteStory
}