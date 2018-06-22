const Category = require("mongoose").model("Category");

module.exports = {
  getCurrentCategory: (req, res) => {
    const currentCategory = req.query.selected;

    Category.where("category")
      .regex(RegExp(currentCategory))
      .populate('destination')
      .then(foundedCategory => {
        const currentFoundedCategory = foundedCategory[0].category.trim();
        
        res.render('category/current', {foundedCategory, currentFoundedCategory});
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render('home/index');
      });
  }
};
