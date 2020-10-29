const knex = require("../knex/knex.js");
var express = require("express");
var router = express.Router();
var loggedIn = require("./middleware/auth.middleware").loggedIn;
var loggedInAdmin = require("./middleware/auth.middleware").loggedInAdmin;
var randomstring = require("randomstring");
const user = require("../dao/user.js");
const ward = require("../dao/ward.js");
const auth = require('../dao/authToken.js');

const ADMIN = "admin";
const MEMBER = "member";

router.get("/program*", async (req, res) => {
  let myUrl = req.path;
  let wardCode = decodeURI(myUrl.replace("/program/", ""));
  if (myUrl != undefined) {
    let wardId = await ward.getWardIDFromCode(wardCode);
    let wardName = await ward.getWardName(wardId);
    let permissionLevel = "";
    if(req.get("authToken")){
      let userId = await auth.getUserIDFromToken(req.get('authToken'));
      //check if user is admin of current ward
      if(await ward.isAdmin(wardId, userId)){
        permissionLevel = ADMIN;
      }
    }
    //TODO sanitize program
    let programData = await ward.getProgram(wardId);
    let sanitizedProgramJson = [];
    programData.forEach(item => {
      if(item.Type === "hymn"){
        sanitizedProgramJson.push({
          title: item.Title,
          hymnNumber: parseInt(item.SubTitle),
        })
      }
      else if(item.Type === "other"){
        sanitizedProgramJson.push({
          title: item.Title,
          subtext: item.SubTitle,
        })
      }
    });
    let responseObject = {
      name: wardName,
      permissionLevel: permissionLevel,
      programJson: {programItems: sanitizedProgramJson},
    }
    res.json(responseObject);
    // knex
    //   .from("ward")
    //   .where("ward_code", myUrl)
    //   .then((rows) => {
    //     if (rows.length != 0) {
    //       let wardId = rows[0].id;

    //       let responseObject = {};
    //       responseObject.name = rows[0].name;
    //       responseObject.programJson = JSON.parse(rows[0].program_json);
    //       responseObject.permissionLevel = "";

    //       //normal, not logged in user
    //       let auth = req.get("authToken");
    //       if (auth == undefined) {
    //         res.json(responseObject);
    //       } else {
    //         knex
    //           .from("auth_token")
    //           .where("auth_token", auth)
    //           .then((rows) => {
    //             if (rows.length !== 0) {
    //               let userId = rows[0].user_id;
    //               knex
    //                 .from("user_in_ward")
    //                 .where({ ward_id: wardId, user_id: userId })
    //                 .then((rows) => {
    //                   if (rows.length != 0) {
    //                     //logged into this ward.
    //                     responseObject.permissionLevel =
    //                       rows[0].permission_level;
    //                     res.json(responseObject);
    //                   } else {
    //                     //not logged into ward but still logged in
    //                     res.send(responseObject);
    //                   }
    //                 });
    //             } else {
    //               res.send(responseObject);
    //             }
    //           });
    //       }
    //     } else {
    //       res.send(400);
    //     }
    //   });
  } else {
    res.send(400);
  }
});

router.post("/program*", loggedInAdmin, async (req, res) => {
  if (req.body.programItems) {
    //remove old program items and add new ones
    let sanitizedItems = [];
    for(let i = 0; i < req.body.programItems.length; i++){
      let item = req.body.programItems[i];
      if(item.hymnNumber){
        //store as hymn
        let sanitizedItem = {
          Position: i,
          Title: item.title,
          SubTitle: item.hymnNumber,
          Type: "hymn",
          WardID: req.wardId
        }
        sanitizedItems.push(sanitizedItem);
      }
      else if(item.subtext){
        let sanitizedItem = {
          Position: i,
          Title: item.title,
          SubTitle: item.subtext,
          Type: "other",
          WardID: req.wardId
        }
        sanitizedItems.push(sanitizedItem);
      }
    }
    await ward.setProgram(req.wardId, sanitizedItems);
    res.send(200);
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

router.post("/get_admin_ward_code", loggedInAdmin, async (req, res) => {
  res.send({ wardCode: await ward.getWardCode(req.wardId)});
});

function createWardCode() {
  var newCode = randomstring.generate({
    length: 6,
    charset: "BCDFGJKLMNPQRSTVWXYZ",
  });
  
  return newCode;
}

module.exports = router;