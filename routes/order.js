var express = require('express');
var router = express.Router();
var foodService = require('../services/food-service');
var orderService = require('../services/order-service');

/* GET users listing. */
router.get('/', function (req, res, next) {

  var names = foodService.getFoods(function (foods) {
    var vm = { title: 'Foods List ', foods: foods };
    return res.render('order', vm);
  });
});

router.get('/list', function (req, res, next) {

  var names = orderService.getOrders(function (err, orders) {
    console.log(orders);
    var vm = { title: 'orders List ', orders: orders };
    return res.render('orders', vm);
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  var foods = JSON.parse(req.body.order);
  var total = Number(req.body.total);
  
  orderService.getListID(function(list_id){
    console.log(list_id);
    orderService.addList(list_id, foods, function(err){
      if(err){
        console.log(err);
        return res.json({ success:false, err:err });
      }
      orderService.addOrder(list_id, total, function(result){
        return res.json({ success:true });
      });
    });
  });
});



module.exports = router;
