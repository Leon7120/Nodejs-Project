var express = require('express');
var router = express.Router();
var validator = require('../config/validator.js');
const passport = require('../config/passport.js');
const controller = require('../controller/login.controller.js');

router.get('/', function (req, res) {
    res.render('login');
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

router.post('/login', validator.userValidator(), (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      
      return res.status(500).json({ message: 'An error occurred during authentication.' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred during login.' });
      }
      return next();
    });
  })(req, res, next);
}, function (req, res) {
  res.status(200).json({ status:200, message: 'http://localhost:3000/v1/home' });
});
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/v1');
  });
});

module.exports = router;