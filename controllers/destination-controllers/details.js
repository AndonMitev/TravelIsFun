const Destination = require("mongoose").model("Destination");

module.exports = {
  getDetails: (req, res) => {
    const destinationId = req.params.id;
    Destination.findById(destinationId)
      .then(destination => {
        destination.views += 1;
        destination
          .save()
          .then(incDestionation => {
            res.render("destination/details", incDestionation);
          })
          .catch(err => {
            res.locals.globalError = err;
            res.render("destinations/all");
          });
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("destination/all");
      });
  },
  changeDetails: (req, res) => {}
};
