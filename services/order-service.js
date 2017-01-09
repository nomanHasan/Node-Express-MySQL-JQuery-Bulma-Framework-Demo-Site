var db = require('../config/db');



exports.demo = function () {

    db.connect(function (err) {
        if (err) {
            console.log('Connection Error');
            return;
        }
        db.query('SELECT * FROM `food`', function (err, result) {
            console.log(result);
        });
    });
}

exports.getOrders = function (next) {
    db.query('SELECT * FROM `orders`', function (err, orders) {
        console.log(orders);
        var count = orders.length;
        orders.forEach(function(element, index, array){
            var query = 'select * from `list` where id='+element.list_id ;
            console.log(query);
            db.query(query, function(err, list){
                if(err){
                    console.log(err);
                    return next(err, null);
                }
                console.log(index);
                console.log(list);
                orders[index].foods = list;
                setTimeout(function(){
                    count--;
                    if(count==0){
                        console.log(orders);
                        return next(null, orders);
                    }
                });
            });
        });
    });
}

exports.getOrder = function (i, next) {
    var id = Number(i);
    db.query('SELECT * FROM `order` where id =\'' + id + '\'', function (err, result) {
        console.log(result);
        return next(result[0]);
    });
}

exports.getListID = function(next){
    db.query('SELECT max(id) as id FROM `list` ', function (err, result) {
        console.log("MAX");
        console.log(result);
        var id;
        if(result[0].id=="null"){
            console.log("NULL");
            id = 1;
        }else{
            console.log("NOTNU");
            id = Number(result[0].id);
            id ++;
        }
        return next(id);
    });
}

exports.addList = function (id, foods, next) {
    var i = 0;
    console.log(foods);
    var counter = foods.length;
    console.log(id);
    foods.forEach(function (food, index, array) {
        i++;
        var query = 'insert into `list` (id, food, quantity ) VALUES('+id+', \'' + food.name + '\', ' + food.quantity + ')';
        console.log(query);
        db.query(query, function (err, result) {
            if (err) {
                console.log(err);
                return next(err);
            }
            setTimeout(function(){
              counter --;
              if(counter ==0){
                  return next(null);
              }  
            })
        });
    });

}

exports.getId = function (next) {
    console.log("GI");
    db.query('select last_insert_id() as id', function (err, result) {
        if (err) {
            console.log(err);
            return next(err, null);
        }
        console.log(result);
        console.log(result[0].id);
        return next(null, result[0].id);
    });
}

exports.addOrder = function (list_id, total , next) {
    var query = 'insert into `orders` (date, list_id, total) VALUES(NOW() ,' + list_id + ' , ' + total + ')';
    console.log(query);
    db.query(query, function (err, result) {
        console.log(result);
        return next(result[0]);
    });
}

