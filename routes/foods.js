var express = require('express');
var router = express.Router();
var foodService = require('../services/food-service');

/* GET users listing. */
router.get('/', function (req, res, next) {

  var names = foodService.getFoods(function (foods) {
    var vm = { title: 'Foods List ', foods: foods};
    return res.render('foods', vm);
  });
});

router.post('/', function (req, res, next) {
  var newFood = {
    name: req.body.name,
    type: req.body.type,
    quantity: req.body.quantity,
    price : req.body.price
  }
  var oldName = req.body.oldName;
  var names = foodService.getFood(oldName, function (food) {
    if(food){
      console.log("Food Exists");
      foodService.updateFood(oldName, newFood, function(err){
        return res.redirect('/foods');
      });
  }else{
    console.log("Food does not exists");
    foodService.addFood(newFood, function(err){
        return res.redirect('/foods');
    });
  }
  });
});

router.get('/:name', function (req, res, next) {
  var name = req.params.name;
  console.log(name);
  var names = foodService.getFood(name, function (food) {
    var vm = { title: 'Foods List ', food: food};
    return res.render('food', vm);
  });
});


module.exports = router;
