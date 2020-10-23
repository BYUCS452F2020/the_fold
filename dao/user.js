var connection = require("./connection.js").getConnection;

let exists = async (email) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT COUNT(UserID) as count FROM User WHERE Email=?`;
    let args = [email];
    connection().query(query, args, (error, results, fields) => {
      if (error) throw error;
      let temp = results[0];
      if (results.length > 0 && results[0].count > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

let create = async (name, email) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO User (FullName, Email) values(?,?);`;
    let args = [name, email];
    connection().query(query, args, (error, results, fields) => {
      if (error) reject(error);
      resolve(results.insertId);
    });
  });
};

//untested
let getAdminUsersWard = (userId) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM WardAdmin WHERE UserID=?`;
    let args = [userId];
    connection().query(query, args, (error, results, fields) => {
      if (error) reject(error);
      if(results.length > 0){
        resolve(results[0].WardID);
      }
      resolve(false);
    })
  })
}


let makeUserAdmin = (userId, wardId) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO WardAdmin (UserID, WardID) VALUES(?,?)`;
    let args = [userId, wardId]
    connection().query(query, args, (error, results, fields) => {
      if (error) reject(error);
      resolve(results.insertId);
    })
  })
}
module.exports = {
  create: create,
  exists: exists,
  getAdminUsersWard: getAdminUsersWard,
  makeUserAdmin: makeUserAdmin,
};
