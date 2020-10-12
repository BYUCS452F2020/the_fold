var mysql = require('mysql');
 
function getConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'my_db'
      });
}

module.exports = getConnection;