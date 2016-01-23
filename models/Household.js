// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('./User');

var householdSchema = new mongoose.Schema({
  name: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Household', householdSchema);
