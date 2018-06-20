const User = require("mongoose").model("User");
module.exports = {

  getProfileData: (req, res) => {
    const userId = req.params.id;
    //console.log(userId);
    User
      .findById(userId)
      .then(user => {
        res.render('users/profile', {user});
      })
      .catch(err => {
        res.locals.globalError = 'No such a user';
        res.render('home/index');
      })
  }
};
