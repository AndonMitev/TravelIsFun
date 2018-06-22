const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Destination = mongoose.model("Destination");
const validation = require("../../util/dbValidation").handleErrorValidation;

module.exports = {
  getEdit: (req, res) => {
    const destinationId = req.params.id;
    Destination.findById(destinationId)
      .then(foundedDestination => {
        res.render("category/edit", foundedDestination);
      })
      .catch(err => {
        res.locals.globalError = validation(err);
        res.render("category/edit", foundedDestination);
      });
  },
  postEdit: (req, res) => {
    const destinationId = req.params.id;
    const destination = ({ category, title, description, imageUrl } = req.body);
    let isCategoryExists = false;

    //Check if category Exists;
    Category.where("category")
      .regex(RegExp(category))
      .findOne()
      .then(foundedCat => {
        if (foundedCat) {
          isCategoryExists = true;
        }
        //Delete Old Item
        Category.find({ destination: destinationId })
          .findOne()
          .populate("destination")
          .then(destToDelete => {
            destToDelete.destination = destToDelete.destination.filter(
              e => e._id != destinationId
            );
            destToDelete
              .save()
              .then(() => {
                Destination.findByIdAndRemove(destinationId)
                  .then(() => {
                    //Create New ITEM!!!!!
                    Destination.create(destination)
                      .then(destination => {
                        if (!isCategoryExists) {
                          Category.create({
                            category: category,
                            destination: destination._id
                          })
                            .then(() => {
                              res.redirect("/");
                            })
                            .catch(err => {
                              res.locals.globalError = err;
                              return res.render("category/current");
                            });
                        } else {
                          Category.where("category")
                            .regex(new RegExp(category))
                            .findOne()
                            .then(founded => {
                              founded.destination.push(destination._id);
                              founded
                                .save()
                                .then(() => {
                                  res.redirect("/");
                                })
                                .catch(err => {
                                  res.globalError = err;
                                  res.render("category/current");
                                });
                            })
                            .catch(err => {
                              res.locals.globalError = err;
                              return res.render("category/current");
                            });
                        }
                      })
                      .catch(err => {
                        res.globalError = validation(err);
                        res.render("category/current", destination);
                      });
                  })
                  .catch(err => {
                    res.locals.globalError = err;
                    res.render("category/current");
                  });
              })
              .catch(err => {
                res.locals.globalError = err;
                res.render("category/current");
              });
          })
          .catch(err => {
            res.locals.globalError = err;
            res.render("category/current");
          });
      })
      .catch(err => {
        res.locals.globalError = err;
        res.render("category/current");
      });
  }
};
