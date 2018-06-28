const Story = require("mongoose").model("Story");
module.exports = {
  storyDetails: (req, res) => {
    const storyId = req.params.id;

    Story.findById(storyId)
      .populate("author")
      .populate("comments")
      .then(story => {
        let isLiked = false;
        let editOrDeleteRestriction = false;
        if (!req.user) {
          return res.render("story/details", { story });
        }
        const userId = req.user.id;
        if (userId == story.author || res.locals.isAdmin) {
          editOrDeleteRestriction = true;
        }

        if (story.likes.indexOf(userId) !== -1) {
          isLiked = true;
        }

        if (story.views.indexOf(userId) === -1) {
          story.views.push(userId);

          story.save().then(story => {
            return res.render("story/details", {
              story,
              isLiked,
              editOrDeleteRestriction
            });
          });
        } else {
          return res.render("story/details", {
            story,
            isLiked,
            editOrDeleteRestriction
          });
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("story/all");
      });
  },
  addLike: (req, res) => {
    const storyId = req.params.id;
    const userId = req.user.id;
    Story.findById(storyId)
      .then(story => {
        if (story.likes.indexOf(userId) === -1) {
          story.likes.push(userId);
          story
            .save()
            .then(() => {
              return res.redirect("back");
            })
            .catch(err => {
              res.locals.globalError = err;
              return res.render("story/details", { story });
            });
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        return res.render("story/details", { story });
      });
  }
};
