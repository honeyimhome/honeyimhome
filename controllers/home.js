/**
 * GET /
 * Home page.
 */

var passport = require('passport');

exports.index = function(req, res) {
  // Dont need to block homepage if signed in?? o_O
  // if(req.isAuthenticated())
  // {
  //   console.log('loggedIn');
  //   return res.redirect('/account')
  // }

  res.render('home', {
    title: 'Home'
  });
};
