var express = require('express');
var router = express.Router();
var controller = require('./controller.js');
var validator = require('./validator.js');
const passport = require('../config/passport.js');
const axios = require('axios');

// app.get('/recipe/:fooditem', async (req, res) => {
//   try {
//     const fooditem = req.params.fooditem;
//     const recipe = await axios.get(`http://www.recipepuppy.com/api/?q=${fooditem}`); 
//      return res.status(200).send({
//       error: false,
//       data: recipe.data.results
//     });
   
//   } catch (error) {
//       console.log(error)
//   }
//  });

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

//CRUD API--------------------------------------------------------------------------------------------------------------
router.get('/pizza', controller.getAll);

router.post('/pizza', validator.pizzaValidator(), controller.createPizza);

router.delete('/pizza/:id', controller.deletePizza);

router.put('/pizza/:id', validator.updateValidator(), controller.updatePizza);

router.get('/pizza/:id', controller.getOnePizza);

module.exports = router;

