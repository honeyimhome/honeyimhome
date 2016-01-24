/**
 * GET /
 * Home page.
 */

var passport = require('passport');

exports.index = function(req, res) {
  if(req.isAuthenticated())
  {
    console.log('loggedIn');
    res.redirect('/account')
    next()
  }

  res.render('home', {
    title: 'Home'
  });
};
