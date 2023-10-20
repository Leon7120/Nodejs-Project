var express = require('express');
var router = express.Router();
var validator = require('../config/validator.js');
const passport = require('../config/passport.js');
const controller = require('../controller/login.controller.js');

router.use(controller.checkAuthenticated);

router.get('/', function (req, res) {
  res.render('login', {
    messages: req.flash('msg')
  });
  // res.sendFile(__dirname + '/index.html');
})
router.get('/register', function (req, res) {
  res.render('register')
})

router.get('/home', controller.isAuthenticated, function (req, res) {
  res.render('home', { messages: req.flash('msg') });
})

// router.post('/register', validator.userValidator(), controller.register);
router.post('/register',  controller.register);

router.post('/login', validator.userValidator(),
  passport.authenticate('local', {
    successRedirect: '/v1/home',
    failureRedirect: '/v1',
    failureFlash: true
  }));

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('msg', "Successfully Logout");
    res.redirect('/v1');
  });
});

module.exports = router;