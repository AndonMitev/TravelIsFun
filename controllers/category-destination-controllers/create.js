const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Destination = mongoose.model("Destination");
const validation = require("../../util/dbValidation").handleErrorValidation;

module.exports = {
  getCreate: (req, res) => {
    res.render("category/create");
  },
  postCreate: (req, res) => {
    const destination = ({ title, description, imageUrl } = req.body);
    const inputCategory = req.body.category;
    let isCategoryExists = false;
    Category.where("category")
      .regex(RegExp(inputCategory))
      .then(founded => {
        if (founded.length !== 0) {
          isCategoryExists = true;
        }

        Destination.create(destination)
          .then(destination => {
            if (!isCategoryExists) {
              Category.create({
                category: inputCategory,
                destination: destination._id
              })
                .then(() => {
                  res.redirect("/");
                })
                .catch(err => {
                  res.locals.globalError = err;
                  return res.render("category/create");
                });
            } else {
              Category.where("category")
                .regex(new RegExp(inputCategory))
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
                      res.render("category/create");
                    });
                })
                .catch(err => {
                  res.locals.globalError = err;
                  return res.render("category/create");
                });
            }
          })
          .catch(err => {
            res.globalError = validation(err);
            res.render("category/create", destination);
          });
      });
  }
};
