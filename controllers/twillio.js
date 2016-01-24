
exports.makeReply = function(req, res) {
  twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  var myReply = req.body.Body;
  console.log(myReply);
  if (myReply == "y" || myReply == "Y") {
    twiml.message('Guest accepted!');

  } else if (myReply == "n" || myReply == "N") {
    twiml.message('Guest Denied!');
  } else {
    twiml.message("invalid response");
  }

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
};
