const knex = require("../../knex/knex.js");

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
function loggedIn(req, res, next) {
  if (req.get("authToken") != undefined) {
    //let userId= await dao.getUserFromAuth(req.get("authToken"))
    knex
      .from("auth_token")
      .where("auth_token", req.get("authToken"))
      .then((rows) => {
        if (rows.length > 0) {
          req.userId = rows[0].user_id;
          req.authToken = rows[0].auth_token;
          next();
        } else {
          res.send(UNAUTHORIZED);
        }
      });
  } else {
    res.send(BAD_REQUEST);
  }
}

function loggedInAdmin(req, res, next) {
  if (req.get("authToken") != undefined) {
    knex
      .from("auth_token")
      .where("auth_token", req.get("authToken"))
      .then((rows) => {
        if (rows.length > 0) {
          //user is logged in
          req.userId = rows[0].user_id;
          req.authToken = rows[0].auth_token;
          knex
            .from("user_in_ward")
            .where("user_id", req.userId)
            .then((rows) => {
              //user is an admin
              if (rows[0] && rows[0].permission_level == "admin") {
                req.wardId = rows[0].ward_id;
                next();
              } else {
                res.send(FORBIDDEN);
              }
            });
        } else {
          res.send(UNAUTHORIZED);
        }
      });
  } else {
    res.send(BAD_REQUEST);
  }
}

module.exports = {
  loggedIn,
  loggedInAdmin,
};
