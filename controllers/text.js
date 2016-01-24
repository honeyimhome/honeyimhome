// Twilio Credentials
var accountSid = 'AC5ef872f6da5a21de157d80997a64bd33';
var authToken = '[AuthToken]';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: "+3053939842",
    from: "+3523224280",
    body: "Hello Anthony",
    mediaUrl: null,
}, function(err, message) {
    console.log(message.sid);
});
