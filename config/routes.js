const controllers = require("../controllers");
const restrictedPages = require("./auth");

module.exports = app => {
  //user
  app.get("/", controllers.home.index);

  app.get("/register", controllers.user.registerGet);
  app.post("/register", controllers.user.registerPost);
  app.post("/logout", controllers.user.logout);
  app.get("/login", controllers.user.loginGet);
  app.post("/login", controllers.user.loginPost);
  app.get(
    "/profile/:id",
    restrictedPages.isAuthed,
    controllers.profile.getProfileData
  );

  //story
  app.get(
    "/story/create",
    restrictedPages.isAuthed,
    controllers.story.getCreateStory
  );
  app.post(
    "/story/create",
    restrictedPages.isAuthed,
    controllers.story.postCreateStory
  );
  app.get("/story/all", controllers.story.viewAll);
  app.get("/story/details/:id", controllers.story.details);
  app.post(
    "/story/details/:id",
    restrictedPages.isAuthed,
    controllers.story.comment
  );

  //destinations
  app.get(
    "/destination/create",
    restrictedPages.hasRole("Admin"),
    controllers.destination.getCreate
  );
  app.post(
    "/destination/create",
    restrictedPages.hasRole("Admin"),
    controllers.destination.postCreate
  );

  app.get("/destination/all", controllers.destination.getAll);
  app.get("/destination/details/:id", controllers.destination.details);
  app.get("/destination/details/like/:id", controllers.destination.addLike);

  app.get(
    "/destination/edit/:id",
    restrictedPages.hasRole("Admin"),
    controllers.destination.getEdit
  );
  app.post(
    "/destination/edit/:id",
    restrictedPages.hasRole("Admin"),
    controllers.destination.postEdit
  );

  //worlds
  app.get(
    "/world/create",
    restrictedPages.hasRole("Admin"),
    controllers.world.getCreate
  );
  app.post(
    "/world/create",
    restrictedPages.hasRole("Admin"),
    controllers.world.postCreate
  );

  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found");
    res.end();
  });
};
