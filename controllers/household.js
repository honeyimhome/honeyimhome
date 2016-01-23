
var Household = require('../models/Household');
var _ = require('lodash');
var async = require('async');

/**
 * GET /households
 * Return list of households.
 */
exports.getHouseholds = function(req, res) {
  console.log("we bout to return households here");
  Household.find(function(err, docs) {
    res.json(docs);
    // res.render('books', { books: docs });
  });
  // if (req.user) {
  //   return res.redirect('/');
  // }
  // res.render('account/login', {
  //   title: 'Login'
  // });
};

/**
 * POST /household
 * Create a household
 */
exports.createHousehold = function(req, res) {
  console.log("In createHousehold method");
  // console.log(req.body);
  var name = req.body.name;
  var user = req.user;
  var household = new Household({
    name: name,
    members: [user._id]
  });
  console.log("The household is: ");
  console.log(household);

  household.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: "couldnt save household"
      });
    }
    res.send("succesfully saved a household");
  });

};


exports.getNewHouse = function(req, res) {
  // if (!req.user) {
  //   return res.redirect('/login');
  // }
  console.log("TESTING");
  Household.find(function(err, docs){
    console.log("TESTING2");
    res.render('householdform', {households: docs});
    console.log("testing3");
  })
  console.log("testing3");
};
