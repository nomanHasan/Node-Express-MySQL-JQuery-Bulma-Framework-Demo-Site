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

exports.getFoods = function (next) {
    db.query('SELECT * FROM `food`', function (err, result) {
        console.log(result);
        return next(result);
    });
}

exports.getFood = function (name, next) {
    db.query('SELECT * FROM `food` where name =\''+name+'\'', function (err, result) {
        console.log(result);
        return next(result[0]);
    });
}

exports.updateFood = function (name, food, next) {
    var queryString = 'update `food` SET name=\''+food.name+'\', type=\''+food.type+'\', quantity='+food.quantity+', price='+food.price+' where name =\''+name+'\'';
    console.log(queryString);
    db.query(queryString, function (err, result) {
        console.log(result);
        return next(result[0]);
    });
}

exports.addFood = function (food, next) {
    db.query('insert into `food` (name, type, quantity, price) VALUES(\''+food.name+'\', \''+food.type+'\', '+food.quantity+', '+food.price+')', function (err, result) {
        console.log(result);
        return next(result[0]);
    });
}

