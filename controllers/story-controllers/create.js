const Story = require("mongoose").model("Story");
const validation = require("../../util/dbValidation").handleErrorValidation;

module.exports = {
  getCreateStory: (req, res) => {
    res.render("story/create");
  },
  postNewStory: (req, res) => {
    const story = { title, description, urlImage } = req.body;
    story.author = req.user.id;

    Story.create(story)
      .then(() => {
        req.session.msg = "Story successful created";
        return res.redirect("/story/all");
      })
      .catch(err => {
        res.locals.globalError = validation(err);
        return res.render("story/create", story);
      });
  }
};
