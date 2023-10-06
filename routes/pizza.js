var express = require('express');
var router = express.Router();
var controller = require('../controller/pizza.controller.js');
var validator = require('../config/validator.js');
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

router.get('/pizza', controller.getAllPizza);
router.get('/pizza/:id', controller.getOnePizza);
router.post('/pizza', validator.pizzaValidator(), controller.createPizza);
router.delete('/pizza/:id', controller.deletePizza);
router.put('/pizza/:id', validator.updateValidator(), controller.updatePizza);

router.get('/pizza/*', function(req,res){
    res.redirect('/');
})

module.exports = router;

