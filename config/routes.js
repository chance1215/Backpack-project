//Update the name of the controller below and rename the file.
const packersController = require("../controllers/packersController.js")
const tripsController = require("../controllers/tripsController.js")
const gearController = require("../controllers/gearController.js")
const notesController = require("../controllers/notesController.js")
module.exports = function(app){

  app.get('/', packersController.index);
  app.get('/login', packersController.showLogin);
  app.post('/login', packersController.register);
}
