const dbOperation = {};
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

dbOperation.query = function (sql, callback) {
    if (!sql) {
        callback();
        return false;
    }
    pool.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return false;
        } else {
            callback(null, rows, fields);
        }
    })
}
module.exports = dbOperation;