const knex = require("../db/knex.js");
const moment = require("moment");

module.exports = {
  create: (req, res) => {
    knex("notesTable")
      .insert({
        content: req.body.content,
        trip_id: req.params.trip_id,
        packer_id: req.params.user_id
      })
      .then(() => {
        res.redirect(`/trip/details/${req.params.trip_id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
