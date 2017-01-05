var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rms'
});

exports.query = function (query, next) {
    connection.query(query, function (err, result) {
        next(err, result);
    });
};

exports.connection = connection;