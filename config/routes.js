//Update the name of the controller below and rename the file.
const packersController = require("../controllers/packersController.js");
const tripsController = require("../controllers/tripsController.js");
const gearController = require("../controllers/gearController.js");
const notesController = require("../controllers/notesController.js");
module.exports = function(app) {
  app.get("/", packersController.index);
  app.get("/login", packersController.showLogin);
  app.post("/login", packersController.login);
  app.post("/register", packersController.register);

  app.get("/", packersController.index);
  app.get("/login", packersController.showLogin);
  app.post("/login", packersController.login);
  app.post("/register", packersController.register);

  app.use(authenticateUser);

  //WELCOM PAGE:
  app.get("/welcome", packersController.welcome);

  //NEW TRIP:
  app.get("/newTrip", tripsController.newTrip);
  app.post("/newTrip/:id", tripsController.createTrip);

  //EDIT TRIP:
  app.get("/editTrip/:id", tripsController.editTrip);
  app.post("/updateTrip/:id", tripsController.updateTrip);
  app.get("/remove/:packer_id/:trip_id", tripsController.remove);

  app.get("/accepted_invite/:user_id/:trip_id", tripsController.acceptInvite);

  //DETAILS PAGE:
  app.get("/trip/details/:id", tripsController.details);

  app.post("/notes/create/:trip_id/:user_id", notesController.create);
  app.post("/sendInvite/:trip_id", tripsController.sendInvite);

  //BACKPACK PAGE:
  app.get("/trip/backpack/:id", gearController.backpack);
  app.post("/addItem/backpack/:tripID", gearController.addIndividualItem);
  app.get(
    "/packIndividual/:tripID/:gearID/:packerID",
    gearController.packIndividual
  );
  app.get(
    "/unpackIndividual/:tripID/:gearID/:packerID",
    gearController.unpackIndividual
  );

  //CAMPGROUND PAGE:
  app.get("/trip/campground/:id", gearController.campground);
  app.post("/addItem/campground/:tripID", gearController.addCommunityItem);
  app.get(
    "/packCommunity/:tripID/:gearID/:packerID",
    gearController.packCommunity
  );
  app.get(
    "/unpackCommunity/:tripID/:gearID/:packerID",
    gearController.unpackCommunity
  );

  //DELETE ITEM FROM BACKPACK/CAMPGROUND PAGE:
  app.get(
    "/deleteIndividualItem/:tripID/:gearID",
    gearController.deleteIndividualItem
  );
  app.get(
    "/deleteCommunityItem/:tripID/:gearID",
    gearController.deleteCommunityItem
  );

  app.get("/logout", packersController.logout);
};
function authenticateUser(req, res, next) {
  if (!req.session.packer_id) {
    console.log("Sorry, you don't have access to that page. Please login.");
    res.redirect("/login");
  } else {
    next();
  }
}
