const knex = require("../db/knex.js");
const moment = require('moment');

module.exports = {

// BACKPACK METHODS START

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
      
      deleteIndividualItem: (req, res) => {
        knex('gearTable')
        .delete()
        .where('id', req.params.gearID)
        .then(() => {
          res.redirect(`/trip/backpack/${req.params.tripID}`)
        })
      },

// BACKPACK METHODS END     

// CAMPGROUND METHODS START

      campground: (req, res) => {
    
        knex.select('gearTable.*', 'packersTable.id AS packer_id', 'packersTable.packerName', 'packer_gearTable.status')
        .from('gearTable')
        .orderBy('gearName', 'type')
        .leftJoin('packer_gearTable', 'gearTable.id', 'packer_gearTable.gear_id')
        .leftJoin('packersTable', 'packersTable.id', 'packer_gearTable.packer_id')
        .where('trip_id', req.params.id)
        .andWhere('type', 'community')
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
              res.render('campground', { gear: gearResults, packer: packerResult[0], trip: tripResult[0] });
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

      addCommunityItem: (req, res) => {
        knex('gearTable')
        .insert({
          gearName: req.body.gearName,
          trip_id: req.params.tripID,
          type: 'community'
        }, '*')
        .then((newItem) => {
          knex('packer_gearTable')
          .insert({
            packer_id: null,
            gear_id: newItem[0].id,
            status: 'unpacked'
          })
          .then(() => {
            res.redirect(`/trip/campground/${req.params.tripID}`)
          })
        })
      },
    
      packCommunity: (req, res) => {
        knex('packer_gearTable')
        .where('gear_id', req.params.gearID)
        .update({
          packer_id: req.params.packerID,
          status: 'packed'
        })
        .then(() => {
          res.redirect(`/trip/campground/${req.params.tripID}`)
        })
      },
    
      unpackCommunity: (req, res) => {
        knex('packer_gearTable')
        .where('gear_id', req.params.gearID)
        .update({
          packer_id: null,
          status: 'unpacked'
        })
        .then(() => {
          res.redirect(`/trip/campground/${req.params.tripID}`)
        })
      },
      
      deleteCommunityItem: (req, res) => {
        knex('gearTable')
        .delete()
        .where('id', req.params.gearID)
        .then(() => {
          res.redirect(`/trip/campground/${req.params.tripID}`)
        })
      },

// CAMPGROUND METHODS END

}
