const uuid = require("uuid").v4;
var connection = require("./connection.js").getConnection;
const AuthToken = require("../mongodb_connections.js").AuthToken();

//untested and unused
let exists = async (token) => {
  // return new Promise((resolve, reject) => {
  //   let query = `SELECT COUNT(AuthTokenID) as count FROM AuthToken WHERE AuthToken=?`;
  //   let args = [token];
  //   connection().query(query, args, (error, results, fields) => {
  //     if (error) reject(error);
  //     if (results.length > 0 && results[0].count) {
  //       resolve(true);
  //     } else {
  //       resolve(false);
  //     }
  //   });
  // });
};

let create = async (userId) => {
  let token = uuid();
  let saveObj = new AuthToken({AuthToken: token, UserID: userId});
  let doc = await saveObj.save();
  return doc.AuthToken
  // return new Promise((resolve, reject) => {
  //   let token = uuid();
  //   let query = `INSERT INTO AuthToken (UserID, AuthToken) values(?,?);`;
  //   let args = [userId, token];
  //   connection().query(query, args, (error, results, fields) => {
  //     if (error) reject(error);
  //     else {
  //       resolve(token);
  //     }
  //   });
  // });
};

//untested
let getUserIDFromToken = async (token) => {
  // return new Promise((resolve, reject) => {
  //   let query = `SELECT UserID FROM AuthToken WHERE AuthToken=?`;
  //   let args = [token];
  //   connection().query(query, args, (error, results, fields) => {
  //     if (error) reject(error);
  //     if (results && results.length > 0) {
  //       resolve(results[0].UserID);
  //     }
  //     resolve(false);
  //   });
  // });
}

module.exports = {
  create: create,
  exists: exists,
  getUserIDFromToken: getUserIDFromToken,
};
