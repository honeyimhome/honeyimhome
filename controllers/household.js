
var Household = require('../models/Household');
var _ = require('lodash');
var async = require('async');

/**
 * GET /households
 * Return list of households.
 */
exports.getHouseholds = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /household
 * Create a household
 */
exports.creatHousehold = function(req, res) {
  console.log(req.body);

};


exports.getNewHouse = function(req, res) {
  // if (!req.user) {
  //   return res.redirect('/login');
  // }
  console.log("TESTING");
  Household.find(function(err, docs){
    res.render('householdform', {households: docs},{
      title: 'New Household'
    });
  })
};
