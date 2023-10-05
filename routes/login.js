var express = require('express');
var router = express.Router();
var validator = require('../config/validator.js');
const passport = require('../config/passport.js');
const controller = require('../controller/controller.js');

router.get('/', function (req, res, next) {
    
    res.render('login', {
      title: 'Login Page',
      messages: req.flash('msg')
    });
    // res.sendFile(__dirname + '/index.html');
  })
  router.get('/register', function (req, res, next) {
    res.render('register', {
      title: 'Register Page',
    });
  })
  
  router.get('/home', controller.isAuthenticated, function (req, res) {
    res.render('home', { messages: req.flash('msg') });
  })
  
  router.post('/register', validator.userValidator(), controller.register);
  
  router.post('/login', validator.userValidator(), passport.authenticate('local', { failureRedirect: '/v1' }), function (req, res) {
    req.flash('msg', 'Welcome To Home');
    res.redirect("/v1/home");
  });
  
  router.post('/logout', function (req, res, next) {
   
    req.logout(function (err) {
      if (err) { return next(err); }
      req.flash('msg', "Successfully Logout");
      res.redirect('/v1');
    });
  });

  module.exports = router;