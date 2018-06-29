const mongoose = require("mongoose");
const CommentData = mongoose.model("CommentData");
const Story = mongoose.model("Story");

module.exports = {
  getEditComment: (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.id;
    if (!userId) {
      return res.render("story/all");
    }
    CommentData.findById(commentId)
      .populate("storyId")
      .then(foundedComment => {
        if (
          foundedComment.userId == userId ||
          foundedComment.storyId.author == userId ||
          res.locals.isAdmin
        ) {
          return res.render("story/editComment", foundedComment);
        } else {
          return res.redirect("/story/all");
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        return res.render("story/all");
      });
  },
  postEditComment: (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.id;
    if (!userId) {
      return res.render("story/all");
    }

    CommentData.findById(commentId)
      .populate("storyId")
      .then(foundedComment => {
        if (
          foundedComment.userId == userId ||
          foundedComment.storyId.author == userId ||
          res.locals.isAdmin
        ) {
          foundedComment.commentContent = req.body.comment;
          foundedComment
            .save()
            .then(newComment => {
              res.redirect("/story/details/" + newComment.storyId._id);
            })
            .catch(err => {
              res.locals.globalError = err;
              res.render("story/all");
            });
        } else {
          return res.render("story/all");
        }
      });
  }
};
