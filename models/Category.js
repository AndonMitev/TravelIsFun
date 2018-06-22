const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const categorySchema = new mongoose.Schema(
  {
    category: {type: String, default: ['World', 'Cities', 'Lands'], required: [true, 'Category is required']},
    destination: [{type: ObjectId, ref: 'Destination'}]
  },
  { usePushEach: true }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
