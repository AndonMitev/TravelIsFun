const Destination = require("mongoose").model("Destination");
const validation = require('../../util/dbValidation').handleErrorValidation;

module.exports = {
  getEdit: (req, res) => {
    const destinationId = req.params.id;
    Destination.findById(destinationId)
      .then(destination => {
        res.render("destination/edit", destination);
      })
      .catch(err => {
        res.locals.globalError = err;
        return res.render("destination/all");
      });
  },
  postEdit: (req, res) => {
    const destinationId = req.params.id;
    Destination.findById(destinationId)
      .then(destination => {
        destination.title = req.body.title;
        destination.imageUrl = req.body.imageUrl;
        destination.description = req.body.description;
        destination.save()
        .then(() => {
          req.session.msg = 'Edit successful';
          res.render('destination/details', {destination});
        })
        .catch(err => {
          res.locals.globalError = validation(err);
          res.render('destination/all');
        })
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render('destination/all');
      })
  }
};
