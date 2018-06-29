const Story = require("mongoose").model("Story");

module.exports = {
  getEdit: (req, res) => {
    const storyId = req.params.id;
    Story.findById(storyId)
      .then(foundedStory => {
        if (!req.user) {
          return res.render("story/all");
        }
        const userId = req.user.id;

        if (foundedStory.author == userId || res.locals.isAdmin) {
          return res.render("story/edit", foundedStory);
        } else {
          res.locals.globalError === "Invalid credentials";
          return res.redirect("/story/all");
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        return res.render("story/all");
      });
  },
  postEdit: (req, res) => {
    console.log("here");
    const storyId = req.params.id;
    const userId = req.user.id;
    Story.findById(storyId)
      .then(foundedStory => {
        if (foundedStory.author == userId || res.locals.isAdmin) {
          const inputData = ({ title, description, urlImage } = req.body);

          foundedStory.title = inputData.title;
          foundedStory.description = inputData.description;
          foundedStory.urlImage = inputData.urlImage;

          foundedStory
            .save()
            .then(newStory => {
              return res.redirect("/story/details/" + newStory._id);
            })
            .catch(err => {
              res.locals.globalError = err;
              return res.render("story/edit", foundedStory);
            });
        } else {
          res.locals.globalError = "invalid credentials";
          return res.redirect("story/all");
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        return res.render("story/all");
      });
  }
};
