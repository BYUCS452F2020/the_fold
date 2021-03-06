// var connection = require("./connection.js").getConnection;
const Ward = require('../mongodb_connections.js').Ward();
// const WardAdmin = require('./../mongodb_connections.js').WardAdmin();
// const WardAdmin = require('./../dao/user').WardAdmin();
const WardAdmin = require("../mongodb_connections.js").WardAdmin();



let create = async (name, code) => {
    let saveObj = new Ward({ Name: name, Code: code });
    let result = await saveObj.save();
    return result._id;
//   return new Promise((resolve, reject) => {
//     let query = `INSERT INTO Ward (Name, Code) values(?, ?);`;
//     let args = [name, code];
//     connection().query(query, args, (error, results, fields) => {
//       if (error) reject(error);
//       resolve(results.insertId);
//     });
//   });
};

let getWardIDFromCode = async (wardCode) => {
    let result = await Ward.find({Code: wardCode});
    if (result.length && result[0]) {
        return result[0]._id;
    }
    return null;
    // return new Promise((resolve, reject) => {
    //     let query = `SELECT WardID FROM Ward WHERE Code=?`;
    //     let args = [wardCode];
    //     connection().query(query, args, (error, results) => {
    //         if (error) reject(error);
    //         resolve(results[0].WardID);
    //     })
    // })
}

let getWardName = async (wardId) => {
    let result = await Ward.find({_id: wardId});
    if (result.length && result[0]) {
        return result[0].Name;
    }
    return null;
    // return new Promise((resolve, reject) => {
    //     let query = `SELECT Name FROM Ward WHERE WardID=?`;
    //     let args = [wardId];
    //     connection().query(query, args, (error, results) => {
    //         if (error) reject(error);
    //         resolve(results[0].Name);
    //     })
    // })
}

let getWardCode = async (wardId) => {
    let result = await Ward.find({_id: wardId});
    if (result.length && result[0]) {
        return result[0].Code;
    }
    return null;
    // return new Promise((resolve, reject) => {
    //     let query = `SELECT Code FROM Ward WHERE WardID=?`;
    //     let args = [wardId];
    //     connection().query(query, args, (error, results) => {
    //         if (error) reject(error);
    //         resolve(results[0].Code);
    //     })
    // })
}

let getProgram = async (wardId) => {
    let result = await Ward.find({_id: wardId});
    if (result.length && result[0]) {
        return result[0].Program;
    }
    return null;
    // return new Promise((resolve, reject) => {
    //     let query = `SELECT Title, SubTitle, Type FROM ProgramItem WHERE WardID=?`;
    //     let args = [wardId];
    //     connection().query(query, args, (error, results, fields) => {
    //         if (error) reject(error);
    //         else {
    //             resolve(results);
    //         }
    //     })
    // })
};

let setProgram = async (wardId, program) => {
    await Ward.updateOne({ _id: wardId }, {
        Program: program
      });
    // return new Promise((resolve, reject) => {

    //     let query = `DELETE FROM ProgramItem WHERE WardID=?`;
    //     let args = [wardId]
    //     connection().query(query, args, (error, results, fields) => {
    //         if (error) reject(error);
    //         else {
    //             query = '';
    //             args = [];
    //             // loop to create query and args
    //             for(let i = 0; i < program.length; i++){
    //                 query += `INSERT INTO ProgramItem (Position, Title, SubTitle, Type, WardID) VALUES(?, ?, ?, ?, ?); `;
    //                 args.push(program[i].Position);
    //                 args.push(program[i].Title);
    //                 args.push(program[i].SubTitle);
    //                 args.push(program[i].Type);
    //                 args.push(program[i].WardID);
    //             }
    //             connection().query(query, args, (error, results, fields) => {
    //                 if (error) reject(error);
    //                 else {
    //                     resolve();
    //                 }
    //             });
    //         }
    //     })
    // })
};

let isAdmin = async (wardId, userId) => {
    let result = await WardAdmin.find({WardID: wardId, UserID: userId});
    if (result.length && result[0]) {
        return true;
    }
    return false;
    // return new Promise((resolve, reject) => {
    //     let query = `SELECT * FROM WardAdmin WHERE WardID=? AND UserID=?`;
    //     let args = [wardId, userId];
    //     connection().query(query, args, (error, results) => {
    //         if (error) reject(error);
    //         if(results.length === 1){
    //             resolve(true);
    //         }
    //         else {
    //             resolve(false);
    //         }
    //     })
    // })
}

module.exports = {
  create: create,
  getWardIDFromCode: getWardIDFromCode,
  getWardName: getWardName,
  getWardCode: getWardCode,
  getProgram: getProgram,
  setProgram: setProgram,
  isAdmin: isAdmin,
};
