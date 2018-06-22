const Category = require('mongoose').model('Category');

module.exports = {
  getAll: (req, res) => {
    Category.find()
      .then(categories => {
        categories = categories.filter(e => e.destination.length !== 0);
        return res.render('home/index', {categories});
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render('home/index');
      });
  }
}