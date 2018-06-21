const Destination = require("mongoose").model("Destination");

module.exports = {
  viewAllDestinationCategories: (req, res) => {
    Destination.find()
      .then(destinations => {
        res.render("destination/all", { destinations });
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("index/home");
      });
  }
};
