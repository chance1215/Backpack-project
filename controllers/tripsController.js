const knex = require("../db/knex.js");
const moment = require('moment');

//When creating a new trip use moment to format the date.
//Example when creating a new date...
// let formattedDate = moment(req.body.date).format('dddd MMM Do, YYYY');  this will output something like 'Saturday Oct 6th, 2018'.
// .insert({ date: formattedDate })

//When editing a trip and you want to populate the date box:
// let formattedDate = moment(req.body.date).format('YYYY-MM-DD');  this is the format the HTML form is expecting.
// then change the html date value to formattedDate.

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
