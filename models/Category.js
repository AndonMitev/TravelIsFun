const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const categorySchema = new mongoose.Schema({
  //cities: [{type: ObjectId, default: []}],
  destinations: [{type: ObjectId, default: []}]
  //world: [{type: ObjectId, default: []}],
});
const Catergory = mongoose.model('Category', categorySchema);
module.exports = Catergory;