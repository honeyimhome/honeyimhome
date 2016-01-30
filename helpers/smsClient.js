
var User = require('../models/User');
var Household = require('../models/Household');
var twilioClient = require('twilioSMSClient');
var emailSMSClient = require('emailSMSClient');

exports.sendSMS = twilioClient.sendSMS;
exports.sendMMS = twilioClient.sendMMS;


exports.sendMessages = function(userName, houseID, imgUrl) {
  console.log("A: " + imgUrl);
  if (userName == 'guest') {
    message = 'An unknown entity has arrived at your dwelling!';
  } else {
    message = userName + " has arrived at home!";
  }

  Household.findOne({
    _id: houseID
  }, function(err, house) {
    var members = house.members;
    members.forEach(function(usrID) {
      User.findOne({
        _id: usrID
      }, function(err, usr) {
        console.log("B: " + imgUrl);

        if (userName != 'guest') {
          if (usr.profile.receiveSms && usr.profile.name != userName) {
            exports.sendSMS(usr.phone, message, function(message, err) {});
          }
        } else {
          if (usr.profile.receiveSms && usr.profile.name != userName) {
            console.log("C: " + imgUrl);
            exports.sendMMS(usr.phone, message, imgUrl, function(message, err) {});
          }
        }
      });
    });
  });
};
