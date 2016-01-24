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
