var mysql = require('mysql');
 
function getConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'the_fold'
      });
}

module.exports = getConnection;