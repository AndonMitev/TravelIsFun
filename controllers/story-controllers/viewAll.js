const Story = require('mongoose').model('Story');

module.exports = {
  viewAll: (req, res) => {
    Story
      .find()
      .then(stories => {
        res.render('story/viewAll', {stories});
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render('home/index');
      })
  }
}