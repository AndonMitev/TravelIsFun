const Story = require("mongoose").model("Story");
module.exports = {
  storyDetails: (req, res) => {
    const storyId = req.params.id;
    Story.findById(storyId)
      .populate("author")
      .populate("comments")
      .then(story => {
        res.render("story/details", story);
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("story/all");
      });
  }
};
