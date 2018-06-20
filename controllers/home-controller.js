const Destination = require('mongoose').model('Destination');
module.exports = {
  index: (req, res) => {
    Destination.find()
    .sort('-createdOn')
    .limit(10)
    .then(destinations => {
      res.render('home/index', {destinations});
    })
    .catch(err => {
      res.locals.globalError = err;
      res.render('home/index');
    })
  }
}