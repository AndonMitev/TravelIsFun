const mongoose = require("mongoose");
const World = mongoose.model("World");


module.exports = {
  getCreate: (req, res) => {
    res.render("world/create");
  },
  postCreate: (req, res) => {
    const worldPlace = ({ title, imageUrl, description } = req.body);

    World.create(worldPlace)
      .then(createdPlace => {
        res.redirect("/");
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("world/create");
      });
  }
};
