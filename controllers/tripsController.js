const knex = require("../db/knex.js");

module.exports = {

  newTrip:(req, res) => {
    res.render('newTrip');
  },

  editTrip:(req, res) => {
    res.render('editTrip');
  },

  details: (req, res) => {
    res.render('details');
  },

  backpack: (req, res) => {
    res.render('backpack');
  },

  campground: (req, res) => {
    res.render('campground');
  },

}
