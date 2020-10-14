var connection = require('./connection.js')

// function getPool() {
//   return mysql.createPool({
//     connectionLimit : "10",
//     host     : 'localhost',
//     user     : 'root',
//     password : 'NY]*bn2*V}3v',
//     database : 'the_fold'
//   });
// }

async function createTables(){

    // get the connection
    // connection.getConnection()
    
    let myConnection = connection();
    await myConnection.connect(async function(err) {
      // create User table
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

    });

    // await myConnection.end(function(err) {
    //   if (err) {
    //     return console.log(err.message);
    //   }
    // });
  
}

module.exports = createTables;
