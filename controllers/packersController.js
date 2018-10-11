const knex = require("../db/knex.js");
const moment = require('moment');

module.exports = {
  index: function(req, res) {
    res.render("index");
  },

  showLogin: function(req,res){
    res.render("login")
  },
  
  login: (req, res) => {
    knex('packersTable').where('email', req.body.email).then((packerResult)=>{
      let packer = packerResult[0];
      if(!packer){
        console.log("User doesn't exits.");
        res.redirect('/login');
        return;
      }
      if(packer.password === req.body.password){
        req.session.packer_id = packer.id;
        req.session.save(()=>{
          res.redirect('/welcome');
        })
      }else{
        console.log("Incorrect password.");
          res.redirect('/login');
      }
    })
    .catch(error => {
      console.error(error);
    })
  },

  register: (req, res) => {
    if(req.body.password === req.body.passwordConfirmation){
      knex('packersTable')
      .insert({
        packerName: req.body.packerName,
        email: req.body.email,
        password: req.body.password
      }, "*")
      .then((newPackerResults) => {
        res.redirect('/login');
      })
      .catch(error => {
        console.error(error);
      })
      }else{
        console.log("Password confirmation doesn't match.")
        res.redirect('/login');
      }
    },

    welcome: (req,res)=>{
      knex('packersTable')
      .where('id',req.session.packer_id)
      .then((packerResults)=>{
        knex.select('tripsTable.*', 'packer_tripTable.role', 'packersTable.id AS admin_id', 'packersTable.packerName')
        .from('tripsTable')
        .where('packer_id', req.session.packer_id)
        .leftJoin('packer_tripTable', 'tripsTable.id', 'packer_tripTable.trip_id')
        .leftJoin('packersTable', 'packersTable.id', 'packer_tripTable.packer_id')
        .then((tripResults)=>{
          res.render("welcome",{packer:packerResults[0], trip:tripResults})
        })
      })
    },

    logout: (req, res)=>{
      req.session.destroy(()=>{
        res.redirect('/');
      });
    },

  };
