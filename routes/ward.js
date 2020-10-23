const knex = require("../knex/knex.js");
var express = require("express");
var router = express.Router();
var loggedIn = require("./middleware/auth.middleware").loggedIn;
var loggedInAdmin = require("./middleware/auth.middleware").loggedInAdmin;
var randomstring = require("randomstring");
const user = require("../dao/user.js");
const ward = require("../dao/ward.js");

const ADMIN = "admin";
const MEMBER = "member";

router.get("/program*", (req, res) => {
  let myUrl = req.path;
  myUrl = decodeURI(myUrl.replace("/program/", ""));
  if (myUrl != undefined) {
    knex
      .from("ward")
      .where("ward_code", myUrl)
      .then((rows) => {
        if (rows.length != 0) {
          let wardId = rows[0].id;

          let responseObject = {};
          responseObject.name = rows[0].name;
          responseObject.programJson = JSON.parse(rows[0].program_json);
          responseObject.permissionLevel = "";

          //normal, not logged in user
          let auth = req.get("authToken");
          if (auth == undefined) {
            res.json(responseObject);
          } else {
            knex
              .from("auth_token")
              .where("auth_token", auth)
              .then((rows) => {
                if (rows.length !== 0) {
                  let userId = rows[0].user_id;
                  knex
                    .from("user_in_ward")
                    .where({ ward_id: wardId, user_id: userId })
                    .then((rows) => {
                      if (rows.length != 0) {
                        //logged into this ward.
                        responseObject.permissionLevel =
                          rows[0].permission_level;
                        res.json(responseObject);
                      } else {
                        //not logged into ward but still logged in
                        res.send(responseObject);
                      }
                    });
                } else {
                  res.send(responseObject);
                }
              });
          }
        } else {
          res.send(400);
        }
      });
  } else {
    res.send(400);
  }
});

router.post("/program*", loggedInAdmin, (req, res) => {
  if (req.body.programItems) {
    //remove old program items and add new ones

    knex("ward")
      .where({ id: req.wardId })
      .update({ program_json: JSON.stringify(req.body) })
      .then(() => {
        res.send(200);
      });
  } else {
    res.send(500);
  }
});

router.post("/create", loggedIn, async (req, res) => {
  if (req.body.wardName != null) {
    //check to make sure they aren't already an admin
    if(!(await user.getAdminUsersWard(req.userId))){
      //create a ward and add them as the admin of that ward
      let wardId = await ward.create(req.body.wardName, createWardCode());
      await user.makeUserAdmin(req.userId, wardId)
      res.send(200);
    } else {
      res.send(403)
    }
  } else {
    res.send(400);
  }
});

router.post("/get_admin_ward_code", loggedInAdmin, (req, res) => {
  res.send(ward.getWardCode(req.wardId));
});

function createWardCode() {
  var newCode = randomstring.generate({
    length: 6,
    charset: "BCDFGJKLMNPQRSTVWXYZ",
  });
  
  return newCode;
}

module.exports = router;