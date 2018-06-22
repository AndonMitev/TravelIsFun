const mongoose = require("mongoose");
const Destination = mongoose.model("Destination");

module.exports = {
  details: (req, res) => {
    const destinationId = req.params.id
    Destination.findById(destinationId)
      .then(destination => {
        let isLiked = false;

        if (!req.user) {
          return res.render("category/details", { destination });
        }

        const currentUserId = req.user.id;
        if (destination.likes.indexOf(currentUserId) !== -1) {
          isLiked = true;
        }

        if (destination.views.indexOf(currentUserId) === -1) {
          destination.views.push(currentUserId);
          destination
            .save()
            .then(destination => {
              return res.render("category/details", {
                destination,
                isLiked
              });
            })
            .catch(err => {
              res.locals.globalError = err;
              return res.render("home/index");
            });
        } else {
          return res.render("category/details", { destination, isLiked });
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("category/current");
      });
  },
  addLike: (req, res) => {
    const destinationId = req.params.id;
    const currentUserId = req.user.id;
    Destination.findById(destinationId)
      .then(destination => {
        if (destination.likes.indexOf(currentUserId) === -1) {
          destination.likes.push(currentUserId);
          destination
            .save()
            .then(() => {
              return res.redirect("back");
            })
            .catch(err => {
              res.locals.globalError = err;
              return res.render("category/details", { destination });
            });
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        return res.render("category/details", { destination });
      });
  }
};
