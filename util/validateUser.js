module.exports = {
  validatePassword: (reqUser, res) => {
    let password = reqUser.password;
    let repeatPass = reqUser.repeat;

    if (password.length === 0) {
      return (res.locals.globalError = "Please enter your password");
    } else if (repeatPass.length === 0) {
      return (res.locals.globalError = "Passwords enter your repeat password");
    } else if (password !== repeatPass) {
      return (res.locals.globalError = "Passwords should match");
    }
  }
};
