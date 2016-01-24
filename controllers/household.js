
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
 * GET /household
 * Return a single specific household
 */

exports.getHousehold = function(req, res) {};

/**
 * POST /household
 * Create a household
 */
exports.addToHousehold = function(req, res) {
  var user = req.user;
  var householdId = req.body.household;
  console.log("the household is: ");
  console.log(householdId);
  Household.findOne({
    _id: householdId
  }, function(err, house) {
    if (!err) {
      console.log("found the house");
      if (house.members.indexOf(user._id) != -1) {
        res.status(400).send('Member already in household');
        return;
      }
      house.members.push(user._id);
      console.log("house memberS: ");
      console.log(house.members);
      house.save(function(err) {
        if (err) {
          console.log("error");
          return res.status(500).send({
            message: "couldnt save household"
          });
        }
        res.send("succesfully updated a household");
      });
    }
  });
};

exports.createHousehold = function(req, res) {
  console.log("In createHousehold method");
  console.log(req.body.data);

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
  Household.find(function(err, docs) {
    res.render('householdform', {
      households: docs
    });
  });
};
