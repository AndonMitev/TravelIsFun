const mongoose = require("mongoose");
const CommentData = mongoose.model("CommentData");
const Story = mongoose.model("Story");
const User = mongoose.model("User");

module.exports = {
  createComment: (req, res) => {
    const storyId = req.params.id;
    const userId = req.user.id;
    const commentContent = req.body.comment;
    const comment = { commentContent, storyId, userId };
    User.findById(userId).then(foundedUser => {
      comment.authorName = foundedUser.username;
      CommentData.create(comment)
        .then(createdComment => {
          Story.findById(storyId)
            .then(foundedStory => {
              foundedStory.comments.push(createdComment._id);
              foundedStory
                .save()
                .then(() => {
                  res.redirect("back");
                })
                .catch(err => {
                  res.locals.globalError = err;
                  res.render("story/all");
                });
            })
            .catch(err => {
              res.locals.globalError = err;
              res.render("story/all");
            });
        })
        .catch(err => {
          res.locals.globalError = err;
          res.render("story/all");
        });
    });
  }
};
