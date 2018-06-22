const getCategory = require('./all');
const getPostCreate = require('./create');
const details = require('./getDetails');
const edit = require('./edit');

module.exports = {
  getPostCreate,
  getCategory,
  details,
  edit
}