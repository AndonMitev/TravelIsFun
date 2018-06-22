const controllers = require("../controllers");
const restrictedPages = require("./auth");

module.exports = app => {
  //user
  app.get("/", controllers.home.getAll);

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
  app.get("/story/all", controllers.story.viewAll); // free
  app.get("/story/details/:id", controllers.story.details);
  app.post(
    "/story/details/:id",
    restrictedPages.isAuthed,
    controllers.story.comment
  );

  //categories
  app.get("/category", controllers.category.getCategory.getCurrentCategory); // free
  app.get(
    "/category/create",
    restrictedPages.hasRole("Admin"),
    controllers.category.getPostCreate.getCreate
  );
  app.post(
    "/category/create",
    restrictedPages.hasRole("Admin"),
    controllers.category.getPostCreate.postCreate
  );
  app.get("/category/:title/details/:id", controllers.category.details.details); // free
  app.get(
    "/category/:title/details/like/:id",
    restrictedPages.isAuthed,
    controllers.category.details.addLike
  );
  app.get(
    "/category/:title/edit/:id",
    restrictedPages.hasRole("Admin"),
    controllers.category.edit.getEdit
  );
  app.post(
    "/category/:title/edit/:id",
    restrictedPages.hasRole("Admin"),
    controllers.category.edit.postEdit
  );

  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found");
    res.end();
  });
};
