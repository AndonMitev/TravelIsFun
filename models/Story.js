const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const storySchema = new mongoose.Schema({
  title: {type: String, required: [true, 'Please enter Story title']},
  description: {type: String, required: [true, 'Please enter Story description']},
  comments: [{type: String,  default: []}],
  createdOn: {type: Date, default: Date.now},
  author: {type: ObjectId, ref: 'User', required: [true, 'User is required to create Story']},
  urlImage: {type: String, required: [true, 'Image is required']}
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;