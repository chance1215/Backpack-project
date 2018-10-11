//Update the name of the controller below and rename the file.
const packersController = require("../controllers/packersController.js")
const tripsController = require("../controllers/tripsController.js")
const gearController = require("../controllers/gearController.js")
const notesController = require("../controllers/notesController.js")
module.exports = function(app){

  app.get('/', packersController.index);
  app.get('/login', packersController.showLogin);
  app.post('/login',packersController.login)
  app.post('/register', packersController.register);

  app.use(authenticateUser);

  app.get('/welcome',packersController.welcome);
  app.get('/newTrip',tripsController.newTrip);
  app.post('/newTrip/:id',tripsController.createTrip);
  app.get('/editTrip/:id',tripsController.editTrip);
  app.post('/updateTrip/:id',tripsController.updateTrip);
  app.get('/remove/:packer_id/:trip_id',tripsController.remove);

  app.get('/trip/details/:id', tripsController.details)
  app.get('/trip/backpack/:id', tripsController.backpack)
  app.get('/trip/campground/:id', tripsController.campground)




  app.get('/logout',packersController.logout);
}
function authenticateUser(req, res, next){
  if(!req.session.packer_id){
    console.log("Sorry, you don't have access to that page. Please login.");
    res.redirect('/login');
  }else{
    next();
  }
}
