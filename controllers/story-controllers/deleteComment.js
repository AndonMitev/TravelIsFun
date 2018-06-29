const mongoose = require("mongoose");
const CommentData = mongoose.model("CommentData");
const Story = mongoose.model("Story");

module.exports = {
  deleteComment: (req, res) => {
    const commentId = req.params.id;
    const userId = req.params.id;
    if (!userId) {
      res.render("story/all");
    }

    CommentData.findByIdAndRemove(commentId)
      .then(() => {
        Story.where("comments")
          .equals(commentId)
          .findOne()
          .then(story => {
            story.comments = story.comments.filter(e => e != commentId);
            story.save().then(() => {
              return res.redirect("back");
            });
          })
          .catch(err => {
            res.locals.globalError = err;
           return res.render("story/all");
          });
      })
      .catch(err => {
        res.locals.globalError = err;
        return res.render("story/all");
      });
  }
};
