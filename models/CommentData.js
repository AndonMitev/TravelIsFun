const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const commentSchema = new mongoose.Schema({
  commentContent: { type: String },
  storyId: { type: ObjectId, ref: "Story", required: true },
  userId: { type: ObjectId, ref: "User", required: true },
  authorName: { type: String, required: [true, "Name of creator is required"] },
  createdOn: { type: Date, default: Date.now }
});

const CommentData = mongoose.model("CommentData", commentSchema);
module.exports = CommentData;
