// Twilio Credentials
var accountSid = 'AC3dfa860de242195562bd25fbc3a4bc4f';
var authToken = 'b075b700d6d7d2c23fe47aafbab0ce2d';
var SERVER_NAME = 'http://hih.maxfresonke.com/';

var User = require('../models/User');
var Household = require('../models/Household');

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

//callback takes in (err, sid)
var sendSMS = function(to, body, callback) {
  client.messages.create({
    to: to,
    from: "+13523224280",
    body: body
  });
  to = "+1" + to;
};

var sendMMS = function(to, body, imgUrl, callback) {
  console.log("IMGURL:" + imgUrl);
  client.messages.create({
    to: to,
    from: "+13523224280",
    body: body,
    mediaUrl: SERVER_NAME + imgUrl
  });
};
