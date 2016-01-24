
var Household = require('../models/Household');
var _ = require('lodash');
var async = require('async');
var lambdaClient = require('../image_processing/lambdaClient');
var fs = require('fs');
var passport = require('passport');

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
exports.joinHousehold = function(req, res) {
  console.log("Posted Add Household");
  var user = req.user;
  var householdId = req.body.household;
  var files = req.files;

  try {
    Household.findOne({
      _id: householdId
    }, function(err, house) {
      if (!err) {
        var count = 0;
        files.forEach(function(file) {
          var path = file.destination + file.filename;
          fs.rename(path, path + ".jpg", function(err) {
            if (err) console.log('ERROR: ' + err);
          });
          path = "./" + path + ".jpg";
          console.log('THE PATH::' + path);

          // Add training image.
          lambdaClient.addTrainingImage(house.albumName, house.albumKey, user._id, path, function(result, error) {
            if (error)
              throw error;
            count++;
            if (count == files.length) {
              lambdaClient.getAlbumSize(house.albumName, house.albumKey, function(result, error) {
                if (error)
                  throw error;
                if (result > 1) {
                  lambdaClient.rebuildAlbum(house.albumName, house.albumKey, function(result, error) {
                    if (error)
                      throw error;
                  });
                }
                // Updating house with new member.
                if (house.members.indexOf(user._id) != -1) {
                  throw new Error("Cant add a member twice");
                  // TODO: Error catching comment out for now cuz we need to keep adding same person
                  // return res.status(400).send('Member already in household');
                }
                house.members.push(user._id);
                house.save(function(err) {
                  if (err)
                    throw err;
                  res.send("succesfully updated a household");
                });
              });
            }
          });
        });
      }
    });
  } catch(error){
  res.status(500).send(error);
  }
};

exports.createHousehold = function(req, res) {
  console.log("Posted Create Household");
  console.log(req.body);
  var name = req.body.household;
  var user = req.user;
  var files = req.files;
  console.log(files);
  var household = new Household({
    name: name,
    members: [user._id]
  });
  console.log("The household is: ");
  console.log(household);

  lambdaClient.createAlbum(household.name, function(result, error) {
    if (error) {
      console.log("got an error???");
      console.log(error);
      return res.status(400).send("Error creating household");
    }
    // Save new Household to Mongoose.
    household.albumName = result.album;
    household.albumKey = result.albumkey;
    household.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: "couldnt save household"
        });
      }
      // Adding training images to lambda
      files.forEach(function(file) {
        var path = file.destination + file.filename;
        fs.rename(path, path + ".jpg", function(err) {
          if (err) console.log('ERROR: ' + err);
        });
        path = "./" + path + ".jpg";
        console.log('THE PATH::' + path);

        // Add training image.
        lambdaClient.addTrainingImage(household.albumName, household.albumKey, user._id, path, function(result, error) {
          if (error) {
            console.log("if its empty possibly no faces detected in the image! means no username");
            throw error;
          }
        });
      });
      res.send("succesfully saved a household");
    });
  });
};

/* VIEWS */

exports.chooseHouseholdPage = function(req, res) {
  if (!req.user) {
    res.redirect('/login');
  }
  console.log('rendering');
  res.render('household/chooseHousehold');
};

exports.newHouseholdForm = function(req, res) {
  Household.find(function(err, docs) {
    res.render('household/newHouseholdForm', {
      households: docs
    });
  });
};

exports.joinHouseholdForm = function(req, res) {
  Household.find(function(err, docs) {
    res.render('household/joinHouseholdForm', {
      households: docs
    });
  });
};
