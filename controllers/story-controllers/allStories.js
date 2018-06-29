const Story = require('mongoose').model('Story');

module.exports = {
  viewAll: (req, res) => {
    Story
      .find()
      .sort('-createdOn')
      .then(stories => {
        let message = req.session.message;
        req.session.message = '';
        res.render('story/all', {stories, message});
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render('home/index');
      })
  }
}