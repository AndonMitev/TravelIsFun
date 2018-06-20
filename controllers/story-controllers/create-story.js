const Story = require('mongoose').model('Story');
const validation = require('../../util/dbValidation').handleErrorValidation;

module.exports = {
  getCreateStory: (req, res) => {
    res.render('story/create');
  },
  postNewStory: (req, res) => {
    const story = {
      title,
      description,
      urlImage
    } = req.body;

    Story.create(story)
      .then(() => {
        res.session.msg = 'Story successful created';
        res.redirect('/story/all');
      })
      .catch(err => {
        res.locals.globalError = validation(err);
        res.render('story/create', story);
      })
  }
}