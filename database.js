var mysql = require('mysql');
var db = null;

module.exports = function () {
    if(!db) {
            db = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'flatmatefinder'
            })
    }
    if(!db){
        console.log("Connection to database failed");
    }
    else{
        console.log("connected to database")
    }
    return db;
};