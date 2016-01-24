
// Twilio Credentials
var accountSid = 'AC3dfa860de242195562bd25fbc3a4bc4f';
var authToken = 'b075b700d6d7d2c23fe47aafbab0ce2d';
var User = require('../models/User');

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

exports.sendMessages = function(message){
  if(message=='guest'){
    message = 'An unknown entity has arrived at your dwelling!';
  }else{
    message = message + " has arrived at home!";
  }

  User.find({}, function(err, users){
    if(err) throw err;
    users.forEach(function(usr){
      if(usr.profile.receiveSms){
        sendMsg("+1" + usr.profile.phone, message, function(err){
          if(err) throw err;
        });
      }      
    });
  })
}
