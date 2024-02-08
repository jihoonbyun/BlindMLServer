var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Check if user is logged in
  // This assumes you're using sessions or cookies to track user login status
  // For example, using `req.session.loggedIn` to track if user is logged in
  let loggedIn = false //req.session.loggedIn;
  let username = false //req.session.username;

  res.render('index', { title: 'Express', loggedIn : loggedIn, username : username });
});

module.exports = router;

