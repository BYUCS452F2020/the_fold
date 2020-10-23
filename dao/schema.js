var connection = require('./connection.js').getConnection

async function createTables(){
    
    let myConnection = connection();

    let createUser = `create table if not exists User(
      UserID int PRIMARY KEY auto_increment,
      Fullname varchar(255) NOT NULL,
      Email varchar(255) NOT NULL
    )`;
      
    await myConnection.query(createUser, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    // create AuthToken table
    let createAuthToken = `create table if not exists AuthToken(
      AuthTokenID int PRIMARY KEY auto_increment,
      AuthToken varchar(255),
      UserID int NOT NULL, 
      CONSTRAINT authTokenToUser
      FOREIGN KEY (UserID)
      REFERENCES User(UserID)
    )`;

    await myConnection.query(createAuthToken, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    // create GoogleLogin table
    let createGoogleLogin = `create table if not exists GoogleLogin(
      GoogleLoginID int PRIMARY KEY auto_increment,
      GoogleToken varchar(255) NOT NULL,
      UserID int NOT NULL,
      CONSTRAINT googleToUser
      FOREIGN KEY (UserID)
      REFERENCES User(UserID)
    )`;

    await myConnection.query(createGoogleLogin, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    // create Ward table
    let createWard = `create table if not exists Ward(
      WardID int PRIMARY KEY auto_increment,
      Name varchar(255) NOT NULL
    )`;

    await myConnection.query(createWard, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    
    // create WardAdmin table
    let createWardAdmin = `create table if not exists WardAdmin(
      WardAdminID int PRIMARY KEY auto_increment,
      UserID int NOT NULL,
      WardID int NOT NULL,
      CONSTRAINT wardAdminToUser
      FOREIGN KEY (UserID)
      REFERENCES User(UserID),
      CONSTRAINT wardAdminToWard
      FOREIGN KEY (WardID)
      REFERENCES Ward(WardID)
    )`;

    await myConnection.query(createWardAdmin, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    // create ProgramItem table
    let createProgramItem = `create table if not exists ProgramItem(
      ProgramItemID int PRIMARY KEY auto_increment,
      Position int NOT NULL,
      Title varchar(255) NOT NULL,
      SubTitle text NOT NULL,
      Type varchar(255) NOT NULL,
      WardID int NOT NULL,
      CONSTRAINT programItemToWard
      FOREIGN KEY (WardID)
      REFERENCES Ward(WardID)
    )`;

    await myConnection.query(createProgramItem, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
}

let dropTables = async () => {
  let query = `
    DROP TABLE IF EXISTS ProgramItem;
    DROP TABLE IF EXISTS AuthToken;
    DROP TABLE IF EXISTS GoogleLogin;
    DROP TABLE IF EXISTS WardAdmin;
    DROP TABLE IF EXISTS Ward;
    DROP TABLE IF EXISTS User;
  `;
  await connection().query(query, (error, results, fields) => {
    if(error) throw error;
  })
}

module.exports = {
  createTables: createTables, 
  dropTables: dropTables,
};
