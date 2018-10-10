const knex = require("../db/knex.js");
const moment = require('moment');

//When creating a new trip use moment to format the date.
//Example when creating a new date...
// let formattedDate = moment(req.body.date).format('dddd MMM Do');
// .insert({ date: formattedDate })

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
