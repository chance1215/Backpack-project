const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    res.render("index");
  },

  showLogin: function(req,res){
    res.render("login")
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
    }
  };
