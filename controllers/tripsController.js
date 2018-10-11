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

  backpack: (req, res) => {
    knex.select('gearTable.*', 'packersTable.id AS packer_id', 'packersTable.packerName', 'packer_gearTable.status')
    .from('gearTable')
    .orderBy('gearName', 'type')
    .leftJoin('packer_gearTable', 'gearTable.id', 'packer_gearTable.gear_id')
    .leftJoin('packersTable', 'packersTable.id', 'packer_gearTable.packer_id')
    .where('trip_id', req.params.id)
    .andWhere('packer_id', req.session.packer_id)
    .andWhere('type', 'individual')
    .then((gearResults) => {
      knex('packersTable')
      .where('id', req.session.packer_id)
      .then((packerResult) => {
        knex.select('tripsTable.id', 'tripsTable.tripName', 'packersTable.packerName', 'packer_tripTable.role')
        .from('tripsTable')
        .where('tripsTable.id', req.params.id)
        .andWhere('packer_tripTable.packer_id', req.session.packer_id)
        .join('packer_tripTable', 'tripsTable.id', 'packer_tripTable.trip_id')
        .join('packersTable', 'packersTable.id', 'packer_tripTable.packer_id')
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

  addIndividualItem: (req, res) => {
    knex('gearTable')
    .insert({
      gearName: req.body.gearName,
      trip_id: req.params.tripID,
      type: 'individual'
    }, '*')
    .then((newItem) => {
      knex('packer_tripTable')
      .where('trip_id', req.params.tripID)
      .then((allPackersInTrip) => {

        for(let i = 0; i < allPackersInTrip.length; i++) {
          knex('packer_gearTable')
          .insert({
            packer_id: allPackersInTrip[i].packer_id,
            gear_id: newItem[0].id,
            status: 'unpacked'
          })
          .then(() => {
            if(i === allPackersInTrip.length - 1){
              res.redirect(`/trip/backpack/${req.params.tripID}`)
            }
          })
        }

      })
    })
  },

  deleteItem: (req, res) => {
    knex('gearTable')
    .delete()
    .where('id', req.params.gearID)
    .then(() => {
      res.redirect(`/trip/backpack/${req.params.tripID}`)
    })
  },

  packIndividual: (req, res) => {
    knex('packer_gearTable')
    .where('gear_id', req.params.gearID)
    .andWhere('packer_id', req.params.packerID)
    .update({
      status: 'packed'
    })
    .then(() => {
      res.redirect(`/trip/backpack/${req.params.tripID}`)
    })
  },

  unpackIndividual: (req, res) => {
    knex('packer_gearTable')
    .where('gear_id', req.params.gearID)
    .andWhere('packer_id', req.params.packerID)
    .update({
      status: 'unpacked'
    })
    .then(() => {
      res.redirect(`/trip/backpack/${req.params.tripID}`)
    })
  },

  campground: (req, res) => {

    knex('tripsTable')
    .where('id', req.params.id)
    .then((tripResult) => {
      res.render('campground', { trip: tripResult[0] });
    })
    .catch(error => {
      console.error(error);
    })

  },

}
