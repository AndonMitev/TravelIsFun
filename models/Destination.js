const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const destinationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    imageUrl: { type: String, required: [true, "Image is required"] },
    description: { type: String, requred: [true, "Description is required"] },
    createdOn: { type: Date, default: Date.now },
    likes: [{ type: ObjectId, default: [] }],
    views: [{ type: ObjectId, default: [] }]
  },
  { usePushEach: true }
);
const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
