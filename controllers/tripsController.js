const knex = require("../db/knex.js");
const moment = require("moment");

//When creating a new trip use moment to format the date.
//Example when creating a new date...
// let formattedDate = moment(req.body.date).format('dddd MMM Do, YYYY');  this will output something like 'Saturday Oct 6th, 2018'.
// .insert({ date: formattedDate })

//When editing a trip and you want to populate the date box:
// let formattedDate = moment(req.body.date).format('YYYY-MM-DD');  this is the format the HTML form is expecting.
// then change the html date value to formattedDate.

module.exports = {
  newTrip: (req, res) => {
    res.render("newTrip");
  },

  editTrip: (req, res) => {
    res.render("editTrip");
  },

  details: (req, res) => {
    console.log(req.session.packer_id);
    knex("tripsTable")
      .where("tripsTable.id", req.params.id)
      .then(trip => {
        console.log(trip);
        knex("packer_tripTable")
          .join("packersTable", "packer_tripTable.packer_id", "packersTable.id")
          .where("packer_tripTable.trip_id", req.params.id)
          .then(packers => {
            console.log(packers);
            knex("packer_tripTable")
              .where("packer_tripTable.trip_id", req.params.id)
              .andWhere("packer_tripTable.role", "admin")
              .then(admin => {
                console.log("ADMIN", admin);
                knex("packersTable")
                  .where("id", req.session.packer_id)
                  .then(user => {
                    console.log("USER", user);
                    knex("notesTable")
                      .where("notesTable.trip_id", req.params.id)
                      .join(
                        "packersTable",
                        "notesTable.packer_id",
                        "packersTable.id"
                      )
                      .orderBy("notesTable.created_at", "desc")
                      .then(notes => {
                        console.log("NOTES", notes);
                        res.render("details", {
                          trip: trip[0],
                          packers,
                          admin: admin[0],
                          user: user[0],
                          notes,
                          moment
                        });
                      });
                  });
              });
          });
      });
  },

  backpack: (req, res) => {
    res.render("backpack");
  },

  campground: (req, res) => {
    res.render("campground");
  }
};
