const mongoose = require("mongoose");
const Story = mongoose.model("Story");
const CommentData = mongoose.model("CommentData");

module.exports = {
  deleteStory: (req, res) => {
    const storyId = req.params.id;

    Story.findByIdAndRemove(storyId).then(() => {
      CommentData.where("storyId")
        .equals(storyId)
        .findOneAndRemove()
        .then(() => {
          res.redirect("/story/all");
        })
        .catch(err => {
          res.locals.globalError = err;
          res.render("story/all");
        });
    });
  }
};
