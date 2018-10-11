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

  createTrip:(req, res) => {
    knex('tripsTable').join('packers', 'packers.id', req.session.packer_id).insert({
      tripName: req.body.tripName,
      location: req.body.location,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    }).then((results)=>{
    res.redirect('/details/:id');
    })
  },

  editTrip:(req, res) => {

    knex('tripsTable')
    .where('id', req.params.id)
    .then((tripsResults) => {
      let startDate = moment(tripsResults[0].startDate).format('YYYY-MM-DD');
      let endDate = moment(tripsResults[0].endDate).format('YYYY-MM-DD');

      knex('packer_tripTable')
      .where('trip_id', req.params.id)
      .join('packersTable', 'packersTable.id', 'packer_tripTable.packer_id')
      .then((packer_tripResults) => {
        res.render('editTrip', {tripsResults, packer_tripResults, startDate, endDate});
      })
    })
  },

  updateTrip: (req, res) => {
    knex('tripsTable')
    .where('id', req.params.id)
    .update({
      tripName: req.body.tripName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      description: req.body.description
      }).then(()=>{
      res.redirect(`/trip/details/${req.params.id}`);
    })
  },

  remove: (req, res) => {
    knex('packer_tripTable').delete()
    .where('packer_id', req.params.packer_id).andWhere('trip_id', req.params.trip_id)
    .then(() => {
      res.redirect(`/editTrip/${req.params.trip_id}`);
    })
  },

  details: (req, res) => {
    
    knex('tripsTable')
    .where('id', req.params.id)
    .then((tripResult) => {
      res.render('details', { trip: tripResult[0] });
    })
    .catch(error => {
      console.error(error);
    })
    
  },

}
