const mongoose = require("mongoose");
const worldSchema = new mongoose.Schema({
  title: {type: String, required: [true, 'Title is required']},
  imageUrl: {type: String, required: [true, 'Image is required']},
  description: {type: String, requred: [true, 'Description is required']},
  createdOn: {type: Date, default: Date.now},
  likes: {type: Number, default: 0},
  views: {type: Number, default: 0}  
});
const World = mongoose.model("World", worldSchema);
module.exports = World;