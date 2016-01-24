// Twilio Credentials
var accountSid = 'AC3dfa860de242195562bd25fbc3a4bc4f';
var authToken = 'b075b700d6d7d2c23fe47aafbab0ce2d';
var SERVER_NAME = 'http://hih.maxfresonke.com/';

var User = require('../models/User');
var Household = require('../models/Household');

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

//callback takes in (err, sid)
var sendSMS = function(to, body) {
  client.messages.create({
    to: to,
    from: "+13523224280",
    body: body
  }, function(err, message) {});
};

var sendMMS = function(to, body, imgUrl){
  console.log("IMGURL:" + imgUrl);
  client.messages.create({
    to: to,
    from: "+13523224280",
    body: body,
    mediaUrl: SERVER_NAME + imgUrl
  }, function(err, message){});
}

exports.sendMessages = function(userName, houseID, imgUrl){
  console.log("A: " + imgUrl);
  if(userName=='guest'){
    message = 'An unknown entity has arrived at your dwelling!';
  }else{
    message = userName + " has arrived at home!";
  }

  Household.findOne({_id: houseID}, function(err, house){
    var members = house.members;
    members.forEach(function(usrID){
      User.findOne({_id: usrID}, function(err, usr){
        console.log("B: " + imgUrl);

        if(userName != 'guest'){
          if(usr.profile.receiveSms && usr.profile.name != userName){
            sendSMS("+1" + usr.phone, message);
          }
        }else{
          if(usr.profile.receiveSms && usr.profile.name != userName){
            console.log("C: " + imgUrl);
            sendMMS("+1" + usr.phone, message, imgUrl);
          }
        }
      });
    });
  });
}
