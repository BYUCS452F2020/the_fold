var express = require("express");
var router = express.Router();
const user = require("../dao/user");
const googleLogin = require("../dao/googleLogin.js");
const authToken = require("../dao/authToken.js");

/* logs a user in with their unique google id */
router.post("/google_login", async (req, res) => {
  if (req.body.googleId != undefined) {
    let userID = await googleLogin.getUserIdFromToken(req.body.googleId);
    if (userID) {
      let token = await authToken.create(userID);
      res.send(`{"authToken": "${token}"}`);
    } else {
      res.send(401);
    }
  } else {
    res.send(400);
  }
});

/** registers a new google user */
router.post("/google_register", async (req, res) => {
  if (
    req.body.googleId != undefined &&
    req.body.name != undefined &&
    req.body.email != undefined
  ) {
    if ((await user.exists(req.body.email)) === false) {
      let userId = await user.create(req.body.name, req.body.email);
      await googleLogin.create(req.body.googleId, userId);
      let token = await authToken.create(userId);
      res.send(`{"authToken": "${token}"}`);
    } else {
      res.send(403);
    }
  } else {
    res.send(400);
  }
});

module.exports = router;
