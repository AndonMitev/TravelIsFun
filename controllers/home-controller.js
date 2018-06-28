const Category = require("mongoose").model("Category");
const Story = require("mongoose").model("Story");

module.exports = {
  getAll: (req, res) => {
    Category.find()
      .then(categories => {
        Story.find()
          .populate("author")
          .then(foundedStories => {
            if (foundedStories.length !== 0) {
              foundedStories.sort((a, b) => b.createdOn - a.createdOn);
             /* let topStories = foundedStories
                .sort((a, b) => b.views.length - a.view.length)
                .slice(0, 10); */
            }

            categories = categories.filter(e => e.destination.length !== 0);
            return res.render("home/index", { categories, foundedStories, });
          });
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("home/index");
      });
  }
};
