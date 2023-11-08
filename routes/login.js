var express = require('express');
var router = express.Router();
var validator = require('../middleware/validator.js');
const passport = require('../middleware/passport.js');
const utils = require('../utils/utils.js');
const controller = require('../controller/login.controller.js');

router.get('/', function (req, res) {
  var message = req.flash('error');
  res.render('login', { message: message });
  // res.sendFile(__dirname + '/index.html');
})
// router.get('/home', passport.authenticate('jwt', { session: false }), function (req, res) {
//   var message2 = req.flash('error');
//   res.render('home', { message: message2 });
// })

router.post('/register', validator.userValidator(), controller.register);

// router.post('/login', validator.userValidator(), controller.login);

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/v1');
  });
});

router.get('/home', utils.isAuthenticated, function (req, res) {
  var message2 = req.flash('error');
  res.render('home', { message: message2});
})
router.post('/login', validator.userValidator(), passport.authenticate("local"), function (req, res) {
  res.send({ status: 301, url: "/home" });
});


module.exports = router;