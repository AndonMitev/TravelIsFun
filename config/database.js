const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const User = require("../models/User");
require("../models/Story");
require("../models/CommentData");
require('../models/Category');
require("../models/Destination");


module.exports = config => {
  mongoose.connect(
    config.dbPath,
    {
      useMongoClient: true
    }
  );
  const db = mongoose.connection;
  db.once("open", err => {
    if (err) throw err;
    User.seedAdminUser()
      .then(() => {
        console.log("Database ready");
      })
      .catch(reason => {
        console.log("Something went wrong");
        console.log(reason);
      });
  });
  db.on("error", reason => {
    console.log(reason);
  });
};
