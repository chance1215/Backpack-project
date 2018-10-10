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
    knex.select('gearTable.*', 'packersTable.id AS packer_id', 'packersTable.packerName')
    .from('gearTable')
    .orderBy('gearName', 'type')
    .leftJoin('packer_gearTable', 'gearTable.id', 'packer_gearTable.gear_id')
    .leftJoin('packersTable', 'packersTable.id', 'packer_gearTable.packer_id')
    .where('trip_id', req.params.id)
    .andWhere('packer_id', req.session.packer_id)
    .then((gearResults) => {
      knex('packersTable')
      .where('id', req.session.packer_id)
      .then((packerResult) => {
        knex('tripsTable')
        .where('id', req.params.id)
        .then((tripResult) => {
          res.render('backpack', { gear: gearResults, packer: packerResult[0], trip: tripResult[0] });
        })
        .catch(error => {
          console.error(error);
        })
      })
      .catch(error => {
        console.error(error);
      })
    })
    .catch(error => {
      console.error(error);
    })
  },

  campground: (req, res) => {
    res.render('campground');
  },

}
