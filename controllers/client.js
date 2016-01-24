var Household = require('../models/Household');
var lambdaClient = require('../image_processing/lambdaClient');
var fs = require('fs');

exports.picRecognize = function(req, res) {
  // Find a unique file name to store the image temporarily
  var imageName = new Date().getTime() + ".jpg";
  var imagePath = "./image_processing/images/" + imageName;
  // Convert the image from base64
  fs.writeFile(imagePath, new Buffer(req.body.image, "base64"), function(err) {
    lambdaClient.recognizeFace(req.body.albumName, req.body.albumKey, imagePath, function(result, error) {
      console.log(result);
      if (error)
        throw error;
      if (result.photos[0].tags.length === 0) {
        res.send('###');
      } else {
        var person = result.photos[0].tags[0].uids[0];
        if (person.confidence < 0.5) {
          res.send("guest");
        } else {
          //console.log(person.prediction);
          res.send(person.prediction);

        }
      }

      fs.unlink(imagePath);
    });
  });
};

// Twilio Credentials
var accountSid = 'AC3dfa860de242195562bd25fbc3a4bc4f';
var authToken = 'b075b700d6d7d2c23fe47aafbab0ce2d';

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
