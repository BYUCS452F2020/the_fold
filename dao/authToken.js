const uuid = require("uuid").v4;
var connection = require("./connection.js").getConnection;

//untested
let exists = async (token) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT COUNT(AuthTokenID) as count FROM AuthToken WHERE AuthToken=?`;
    let args = [token];
    connection().query(query, args, (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0 && results[0].count) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

let create = async (userId) => {
  return new Promise((resolve, reject) => {
    let token = uuid();
    let query = `INSERT INTO AuthToken (UserID, AuthToken) values(?,?);`;
    let args = [userId, token];
    connection().query(query, args, (error, results, fields) => {
      if (error) reject(error);
      else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  create: create,
  exists: exists,
};
