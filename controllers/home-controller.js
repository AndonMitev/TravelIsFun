const Category = require("mongoose").model("Category");
const Story = require("mongoose").model("Story");

module.exports = {
  getAll: (req, res) => {
    Category.find()
      .then(categories => {
        Story.find()
          .populate("author")
          .then(foundedStories => {
            let topStories = [];
            if (foundedStories.length !== 0) {
              foundedStories.sort(
                (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
              );
              topStories = foundedStories
                .slice(0, 10)
                .sort((a, b) => b.likes.length - a.likes.length);
            }

            categories = categories.filter(e => e.destination.length !== 0);
            return res.render("home/index", {
              categories,
              foundedStories,
              topStories
            });
          });
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("home/index");
      });
  }
};
