var connection = require("./connection.js").getConnection;

let getUserIdFromToken = async (googleToken) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT UserID FROM GoogleLogin WHERE GoogleToken=?`;
    let args = [googleToken];
    connection().query(query, args, (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        resolve(results[0].UserID);
      }
      resolve();
    });
  });
};

let create = async (googleID, userId) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO GoogleLogin (GoogleToken, UserID) values(?,?);`;
    let args = [googleID, userId];
    connection().query(query, args, (error, results, fields) => {
      if (error) reject(error);
      else {
        resolve(results.insertId);
      }
    });
  });
};

module.exports = {
  create: create,
  getUserIdFromToken: getUserIdFromToken,
};
