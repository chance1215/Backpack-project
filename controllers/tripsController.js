const knex = require("../db/knex.js");
const moment = require("moment");
const nodemailer = require("nodemailer");

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

  createTrip:(req, res) => {
    knex('tripsTable').insert({
      tripName: req.body.tripName,
      location: req.body.location,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }, '*')
    .then((newresults)=>{
      knex('packer_tripTable')
      .insert({
        packer_id: req.session.packer_id,
        trip_id: newresults[0].id,
        role: 'admin',
        confirmed: true
      })
      .then(()=>{
        res.redirect(`/trip/details/${newresults[0].id}`);
      })
    })
  },

  editTrip: (req, res) => {
    knex("tripsTable")
      .where("id", req.params.id)
      .then(tripsResults => {
        let startDate = moment(tripsResults[0].startDate).format("YYYY-MM-DD");
        let endDate = moment(tripsResults[0].endDate).format("YYYY-MM-DD");

        knex("packer_tripTable")
          .where("trip_id", req.params.id)
          .join("packersTable", "packersTable.id", "packer_tripTable.packer_id")
          .then(packer_tripResults => {
            res.render("editTrip", {
              tripsResults,
              packer_tripResults,
              startDate,
              endDate
            });
          });
      });
  },

  updateTrip: (req, res) => {
    knex("tripsTable")
      .where("id", req.params.id)
      .update({
        tripName: req.body.tripName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        description: req.body.description
      })
      .then(() => {
        res.redirect(`/trip/details/${req.params.id}`);
      });
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

  remove: (req, res) => {
    knex("packer_tripTable")
      .delete()
      .where("packer_id", req.params.packer_id)
      .andWhere("trip_id", req.params.trip_id)
      .then(packerResult => {
        knex
          .select("packer_gearTable.*")
          .from("gearTable")
          .where("trip_id", req.params.trip_id)
          .andWhere("packer_gearTable.packer_id", req.params.packer_id)
          .andWhere("gearTable.type", "community")
          .andWhere("gearTable.trip_id", req.params.trip_id)
          .leftJoin(
            "packer_gearTable",
            "packer_gearTable.gear_id",
            "gearTable.id"
          )
          .then(results => {
            let promiseArr = [];
            for (let i = 0; i < results.length; i++) {
              promiseArr.push(
                knex("packer_gearTable")
                  .where("id", results[i].id)
                  .update({
                    status: "unpacked",
                    packer_id: null
                  })
              );
            }
            Promise.all(promiseArr).then(function(values) {
              console.log(values);
              res.redirect(`/editTrip/${req.params.trip_id}`);
            });
          });
      });
  },

  sendInvite: (req, res) => {
    console.log(req.body);

    const output = `
    <p>You have been Invited to a trip!</p>
    <h3>${req.body.name}</h3>
    <h5>${req.body.location}</h5>
    <h5>${req.body.date}</h5>
    <p>${req.body.description}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "email.is.not.real123@gmail.com",
        pass: "asdfghjkl123!" // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: `${req.body.packerName} ` + " 👻 <email.is.not.real123@gmail.com>", // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "You've been invited to a trip!", // Subject line
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.redirect(`/trip/details/${req.params.trip_id}`);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  },

  backpack: (req, res) => {
    res.render("backpack");
  },

  campground: (req, res) => {
    res.render("campground");
  }
};
