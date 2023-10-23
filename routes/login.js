var express = require('express');
var router = express.Router();
var validator = require('../config/validator.js');
const passport = require('../config/passport.js');
const controller = require('../controller/login.controller.js');

router.get('/', function (req, res) {
  if (req.session.messages) {
    res.render('login', { message: req.session.messages });
  } else {
    res.render('login');
  }
  // res.sendFile(__dirname + '/index.html');
})
// router.get('/home', controller.isAuthenticated, function (req, res) {
//   res.render('home');
// })
router.get('/home', function (req, res) {
  res.render('home');
})
router.post('/register', validator.userValidator(), controller.register);
//router.post('/register', controller.register);

router.post('/login', validator.userValidator(),
  passport.authenticate('local', {
    successRedirect: "/v1/home",
    failureRedirect: ("/v1"),
    passReqToCallback: true,
  }), function (req, res) {
    res.json(req.session.messages);
  });

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/v1');
  });
});

module.exports = router;