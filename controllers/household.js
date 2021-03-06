
var Household = require('../models/Household');
var User = require('../models/User');
var _ = require('lodash');
var async = require('async');
var lambdaClient = require('../image_processing/lambdaClient');
var fs = require('fs');
var passport = require('passport');

// module.exports = function(maxImgs){
//   maxImages = maxImgs;
// }

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
 *
 * Return a single specific household object with populated user objects
 */

var getPopulatedHousehold = function(id, callback) {
  Household
    .findOne({
      _id: id
    })
    .populate('members')
    .exec(function(err, house){
      if(!err) {
        // console.log(house);
        return callback(null, house);
      }else return(err);

    });
};

/**
 * GET /household/manage{id}
 * Return a single specific household
 */
exports.manageHousehold = function(req, res) {
  var householdId = req.params.id;
  getPopulatedHousehold(householdId, function(err, house) {
    res.render('household/manage', {
      house: house
    });
  });

}

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
          lambdaClient.addTrainingImage(house.albumName, house.albumKey, user._id.toString(), path, function(result, error) {
            if (error) {
              console.log("ERROR. ERROR Adding Training Image. " + error);
              return;
            }
            count++;
            if (count == files.length) {
              lambdaClient.getAlbumSize(house.albumName, house.albumKey, function(result, error) {
                if (error) {
                  console.log("ERROR. Error getting album size " + error);
                  return;
                }
                if (result > 1) {
                  lambdaClient.rebuildAlbum(house.albumName, house.albumKey, function(result, error) {
                    if (error) {
                      console.log("ERROR. Rebuilding Album " + error);
                      return;
                    }
                  });
                }
                // Updating house with new member.
                if (house.members.indexOf(user._id) != -1) {
                  console.log("ERROR. Cant add a member twice");
                  return;
                  // TODO: Error catching comment out for now cuz we need to keep adding same person
                  // return res.status(400).send('Member already in household');
                }
                house.members.push(user._id);
                house.save(function(err) {
                  if (err) {
                    console.log("ERROR. Error saving house: " + err);
                    return;
                  }
                  user.household = house._id;
                  user.save(function(err) {
                    if (err) {
                      return next(err);
                    }
                    req.flash('success', {
                      msg: 'Profile information updated.'
                    });
                    // Respond with done.
                    res.send("succesfully updated a household");
                  });


                });
              });
            }
            // Delete Temp images
            // setInterval(function() {
            //   console.log("deleting@@@@@@@@@@@@");
            //   fs.unlink(path);
            // }, 2000);
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

        console.log("THE USER ID");
        console.log(user._id);
        // Add training image.
        lambdaClient.addTrainingImage(household.albumName, household.albumKey, user._id.toString(), path, function(result, error) {
          if (error) {
            console.log("if its empty possibly no faces detected in the image! means no username");
            console.log("ERROR. Error adding training image");
            console.log(error);
            return;
          }
          // Delete Temp images
          console.log("deleting@@@@@@@@@@@@");
          fs.unlinkSync(path);

        });
      });
      user.household = household._id;
      user.save(function(err) {
        if (err) {
          return next(err);
        }
        req.flash('success', {
          msg: 'Profile information updated.'
        });
        // Respond with done.
        res.send("succesfully created a household");
      });

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

    console.log(req.params.maxImages);
    res.render('household/newHouseholdForm', {
      households: docs,
      maxAmount: req.params.maxImages
    });
  });
};

exports.joinHouseholdForm = function(req, res) {
  Household.find(function(err, docs) {
    res.render('household/joinHouseholdForm', {
      households: docs,
      maxAmount: req.params.maxImages
    });
  });
};
