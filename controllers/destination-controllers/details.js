const Destination = require("mongoose").model("Destination");

module.exports = {
  getDetails: (req, res) => {
    const destinationId = req.params.id;

    Destination.findById(destinationId)
      .then(destination => {
        let isLiked = false;
       
        if (!req.user) {
          return res.render("destination/details", { destination });
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
              return res.render("destination/details", {
                destination,
                isLiked
              });
            })
            .catch(err => {
              res.locals.globalError = err;
              return res.render("destination/all");
            });
        } else {
          return res.render("destination/details", { destination, isLiked });
        }
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("destination/all");
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
              return res.render("destination/all");
            });
        }
      })
      .catch(err => {
        res.globalError = err;
        return res.render("destination/all");
      });
  }
};
