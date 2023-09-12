var express = require('express');
var router = express.Router();
var controller = require('./controller.js');
var validator = require('./validator.js');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
  });

  // res.sendFile(__dirname + '/index.html');
})

router.get('/user', controller.isAuthenticated, function (req, res) {
  res.render('user');
  console.log(req.session.viewCount);
})

router.post('/user', validator.userValidator(), controller.createUser);

router.post('/login', validator.userValidator(), controller.login);

router.get('/logout', controller.logout);

//CRUD API--------------------------------------------------------------------------------------------------------------
router.get('/pizza', controller.getAll);

router.post('/pizza', validator.pizzaValidator(), controller.createPizza);

router.delete('/pizza/:id', controller.deletePizza);

router.put('/pizza/:id', validator.updateValidator(), controller.updatePizza);

router.get('/pizza/:id', controller.getOnePizza);

module.exports = router;

