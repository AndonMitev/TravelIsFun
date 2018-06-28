const Story = require("mongoose").model("Story");

module.exports = {
  getEdit: (req, res) => {
    const storyId = req.params.id;
    Story.findById(storyId)
      .then(foundedStory => {
        if (!req.user) {
          res.render("story/all");
        }
        const userId = req.user.id;
        if (foundedStory.author === userId || res.locals.isAdmin) {
          res.render("story/edit", foundedStory);
        } else {
          res.locals.globalError === "Invalid credentials";
          res.render("story/all");
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("story/all");
      });
  }
};
