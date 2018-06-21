const Destinaton = require("mongoose").model("Destination");
const validation = require("../../util/dbValidation").handleErrorValidation;

module.exports = {
  getCreateNewDestination: (req, res) => {
    res.render("destination/create");
  },
  postCreateNewDestination: (req, res) => {
    const destination = ({ title, description, imageUrl } = req.body);

    Destinaton.create(destination)
      .then(createdDestination => {
        req.session.msg = "Destination successful created";
        res.redirect("/");
      })
      .catch(err => {
        res.locals.globalError = validation(err);
        res.render("destination/create");
      });
  }
};
