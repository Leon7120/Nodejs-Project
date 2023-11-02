var express = require('express');
var router = express.Router();
var validator = require('../middleware/validator.js');
const passport = require('../middleware/passport.js');
const utils = require('../utils/utils.js');

router.get('/', utils.checkAuthenticated, function (req, res) {
  var message = req.flash('error');
  res.render('login', { message: message });
  // res.sendFile(__dirname + '/index.html');
})
router.get('/home', passport.authenticate('jwt', { session: false }), function (req, res) {
  var message2 = req.flash('error');
  res.render('home', { message: message2 });
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
  res.status(200).json({ status: 200, message: 'http://localhost:3000/v1/home' });
});
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/v1');
  });
});

module.exports = router;