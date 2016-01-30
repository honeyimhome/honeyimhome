var SERVER_NAME = 'http://hih.maxfresonke.com/';

var User = require('../models/User');
var Household = require('../models/Household');

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://honeyimhome.sender@gmail.com:123pass123@smtp.gmail.com');

// setup e-mail data with unicode symbols
var anthonyPhone = '3053939842@txt.att.net'
var maxPhone = '4075758643@messaging.sprintpcs.com'
var nickPhone = '9548818210@tmomail.net'
var mailOptions = {
  to: nickPhone, // list of receivers
  subject: '', // Subject line
  text: 'Hello world', // plaintext body
};



// send mail with defined transport object
var mailFunc = function(mailOption) {
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  })
};



exports.sendSMS = function(to, body, callback) {
  mailFunc(mailOption);
};
