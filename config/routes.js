const controllers = require("../controllers");
const restrictedPages = require("./auth");

module.exports = app => {
  //user
  app.get("/", controllers.home.index);
  app.get("/about", restrictedPages.hasRole("Admin"), controllers.home.about);
  app.get("/register", controllers.user.registerGet);
  app.post("/register", controllers.user.registerPost);
  app.post("/logout", controllers.user.logout);
  app.get("/login", controllers.user.loginGet);
  app.post("/login", controllers.user.loginPost);
  app.get('/profile/:id', controllers.profile.getProfileData);

  //story
  app.get('/story/create', controllers.story.getCreateStory);
  app.post('/story/create', controllers.story.postCreateStory);
  app.get('/story/viewAll', controllers.story.viewAll);

  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found");
    res.end();
  });
};
