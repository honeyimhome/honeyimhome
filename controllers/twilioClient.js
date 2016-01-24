// Twilio Credentials
var accountSid = 'AC3dfa860de242195562bd25fbc3a4bc4f';
var authToken = 'b075b700d6d7d2c23fe47aafbab0ce2d';
var User = require('../models/User');
var Household = require('../models/Household');

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

//callback takes in (err, sid)
var sendMsg = function(to, body, callback) {
  client.messages.create({
    to: to,
    from: "+13523224280",
    body: body
  }, function(err, message) {
    callback(err, message);
  });
};

exports.sendMessages = function(userName, houseID){
  if(userName=='guest'){
    message = 'An unknown entity has arrived at your dwelling!';
  }else{
    message = userName + " has arrived at home!";
  }
  console.log("USERNAME: " + userName);
  console.log("HouseID: " + houseID);

  Household.findOne({_id: houseID}, function(err, house){
    var members = house.members;
    members.forEach(function(usrID){
      User.findOne({_id: usrID}, function(err, usr){
        if(usr.profile.receiveSms && usr.profile.name != userName){
          sendMsg("+1" + usr.phone, message, function(err){
            if(err) throw err;
          });
        }
      });
    });
  });
}
