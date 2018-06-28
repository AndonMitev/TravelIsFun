const User = require("mongoose").model("User");
const Story = require("mongoose").model("Story");

module.exports = {
  getProfileData: (req, res) => {
    const userId = req.params.id;

    Story.where("author").equals(userId)
      .then(foundedStories => {
        if(foundedStories.length !== 0) {
          foundedStories.forEach(e => e.description = e.description.substr(0, 50));
        }
        res.render('users/profile', {foundedStories})
      })
      .catch(err => {
        res.locals.globalError = err;
        return;
      })
  }
};
