var Household = require('../models/Household');
var lambdaClient = require('../image_processing/lambdaClient');
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
          res.send(person.prediction);

        }
      }

      fs.unlink(imagePath);
    });
  });
};

// Twilio Credentials
var accountSid = 'AC5ef872f6da5a21de157d80997a64bd33';
var authToken = '[AuthToken]';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

var sendMsg = function(to, body) {
  client.messages.create({
    to: to,
    from: "+13523224280",
    body: body,
    mediaUrl: null,
  }, function(err, message) {
    console.log(message.sid);
  });
};



// (function() {
//   sendMsg("+14075758643", "test msg");
// })();
