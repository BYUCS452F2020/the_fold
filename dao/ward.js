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

let getWardCode = (wardId) => {
    return new Promise((resolve, reject) => {
        let query = ``;
        let args = ``;
        connection().query(query, args, (error, results) => {
            if (error) reject(error);
            
        })
    })
}

let getProgram = (wardCode) => {
    return new Promise((resolve, reject) => {
        let query = ``;
        let args = []
        connection().query(query, args, (error, results, fields) => {
            if (error) reject(error);

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
                    query += `INSERT INTO ProgramItem () VALUES()`;
                    args.push();
                }
                connection().query(query, args, (error, results, fields) => {
                    if (error) reject(error);
                    else {
                        
                    }
                })
            }
        })
    })
};

module.exports = {
  create: create,
  getWardCode: getWardCode,
  getProgram: getProgram,
  setProgram: setProgram,
};
