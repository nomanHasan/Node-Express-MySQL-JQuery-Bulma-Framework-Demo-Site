var express = require('express');
var router = express.Router();
var foodService = require('../services/food-service');

/* GET users listing. */
router.get('/', function (req, res, next) {

  var names = foodService.getFoods(function (foods) {
    var vm = { title: 'Foods List ', foods: foods};
    return res.render('order', vm);
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  return res.json({ success:true });
});



module.exports = router;
