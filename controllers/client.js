var Household = require('../models/Household');
var lambdaClient = require('../image_processing/lambdaClient');
var fs = require('fs');
var twillio = require('./twilioClient');
var User = require('../models/User');

exports.picRecognize = function(req, res) {
  // Find a unique file name to store the image temporarily
  var imageName = new Date().getTime() + ".jpg";
  var imagePath = "./public/" + imageName;
  // Convert the image from base64
  fs.writeFile(imagePath, new Buffer(req.body.image, "base64"), function(err) {
    lambdaClient.recognizeFace(req.body.albumName, req.body.albumKey, imagePath, function(result, error) {
      console.log(result);
      if (error){
        console.log(error);
        fs.unlink(imagePath);
        res.status(400).send("Error identifying image");
        return;
      }
      if (result.photos[0].tags.length === 0) {
        fs.unlink(imagePath);
        res.status(400).send("Error identifying image.");
        return;
      } else {
        var person = result.photos[0].tags[0].uids[0];
        var name = "";
        console.log("CONFIDENCE: " + person.confidence);
        if (person.confidence < 0.7) {
          name="guest";
          console.log("NAME IN CLIENT: " + imageName)
          twillio.sendMessages(name, req.body.houseID, imageName);
          res.json({'isGuest': true});
        } else {
          User.findOne({_id:person.prediction}, function(err, usr){
            name = usr.profile.name;
            twillio.sendMessages(name, req.body.houseID, imageName);
            var obj = {isGuest: false, user: usr};
            res.json(obj);
          });
        }
        setTimeout(function(){
          try{
            fs.unlink(imagePath);
          }catch(e){
            console.log(e);
          }
        }, 10000)
      }
      // fs.unlink(imagePath);
    });
  });
};
