var connection = require("./connection.js").getConnection;

//untested
let create = async (name, code) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO Ward (Name, Code) values(?, ?);`;
    let args = [name, code];
    connection().query(query, args, (error, results, fields) => {
      if (error) reject(error);
      resolve(results.insertId);
    });
  });
};

let getWardIDFromCode = (wardCode) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT WardID FROM Ward WHERE Code=?`;
        let args = [wardCode];
        connection().query(query, args, (error, results) => {
            if (error) reject(error);
            resolve(results[0].WardID);
        })
    })
}

let getWardName = (wardId) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT Name FROM Ward WHERE WardID=?`;
        let args = [wardId];
        connection().query(query, args, (error, results) => {
            if (error) reject(error);
            resolve(results[0].Name);
        })
    })
}

let getWardCode = (wardId) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT Code FROM Ward WHERE WardID=?`;
        let args = [wardId];
        connection().query(query, args, (error, results) => {
            if (error) reject(error);
            resolve(results[0].Code);
        })
    })
}

let getProgram = (wardId) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT Title, SubTitle, Type FROM ProgramItem WHERE WardID=?`;
        let args = [wardId];
        connection().query(query, args, (error, results, fields) => {
            if (error) reject(error);
            else {
                resolve(results);
            }
        })
    })
};

let setProgram = (wardId, program) => {
    return new Promise((resolve, reject) => {

        let query = `DELETE FROM ProgramItem WHERE WardID=?`;
        let args = [wardId]
        connection().query(query, args, (error, results, fields) => {
            if (error) reject(error);
            else {
                query = '';
                args = [];
                // loop to create query and args
                for(let i = 0; i < program.length; i++){
                    query += `INSERT INTO ProgramItem (Position, Title, SubTitle, Type, WardID) VALUES(?, ?, ?, ?, ?); `;
                    args.push(program[i].Position);
                    args.push(program[i].Title);
                    args.push(program[i].SubTitle);
                    args.push(program[i].Type);
                    args.push(program[i].WardID);
                }
                connection().query(query, args, (error, results, fields) => {
                    if (error) reject(error);
                    else {
                        resolve();
                    }
                });
            }
        })
    })
};

let isAdmin = (wardId, userId) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM WardAdmin WHERE WardID=? AND UserID=?`;
        let args = [wardId, userId];
        connection().query(query, args, (error, results) => {
            if (error) reject(error);
            if(results.length === 1){
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
    })
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
