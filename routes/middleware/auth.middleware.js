const knex = require("../../knex/knex.js");
const authToken = require("../../dao/authToken");
const user = require("../../dao/user");
const { getAdminUsersWard } = require("../../dao/user.js");

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

//untested
async function loggedIn(req, res, next) {
  if (req.get("authToken") != undefined) {
    let token = req.get("authToken");
    let userId = await authToken.getUserIDFromToken(token);
    if (userId) {
      req.userId = userId;
      req.authToken = token;
      next();
    } else {
      res.send(UNAUTHORIZED);
    }
  } else {
    res.send(BAD_REQUEST);
  }
}

//untested
async function loggedInAdmin(req, res, next) {
  if (req.get("authToken") != undefined) {
    let token = req.get("authToken");
    let userId = await authToken.getUserIDFromToken(token);
    if (userId) {
      let wardId = await user.getAdminUsersWard(userId);
      if (wardId) {
        req.userId = userId;
        req.authToken = token;
        req.wardId = wardId;
        next();
      } else {
        res.send(FORBIDDEN);
      }
    } else {
      res.send(UNAUTHORIZED);
    }
  } else {
    res.send(BAD_REQUEST);
  }
}

module.exports = {
  loggedIn,
  loggedInAdmin,
};
