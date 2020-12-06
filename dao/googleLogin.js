var connection = require("./connection.js").getConnection;
var GoogleLogin = require("../mongodb_connections").GoogleLogin();

let getUserIdFromToken = async (googleToken) => {
  let result = await GoogleLogin.find({GoogleToken: googleToken})
  if(result[0].UserID){
    return result.UserID
  }
  return null;
  // return new Promise((resolve, reject) => {
  //   let query = `SELECT UserID FROM GoogleLogin WHERE GoogleToken=?`;
  //   let args = [googleToken];
  //   connection().query(query, args, (error, results, fields) => {
  //     if (error) throw error;
  //     if (results.length > 0) {
  //       resolve(results[0].UserID);
  //     }
  //     resolve();
  //   });
  // });
};

let create = async (googleID, userId) => {
  let saveObj = new GoogleLogin({GoogleID: googleID, UserID: userId});
  let result = await saveObj.save();

  // return new Promise((resolve, reject) => {
  //   let query = `INSERT INTO GoogleLogin (GoogleToken, UserID) values(?,?);`;
  //   let args = [googleID, userId];
  //   connection().query(query, args, (error, results, fields) => {
  //     if (error) reject(error);
  //     else {
  //       resolve(results.insertId);
  //     }
  //   });
  // });
};

module.exports = {
  create: create,
  getUserIdFromToken: getUserIdFromToken,
};
