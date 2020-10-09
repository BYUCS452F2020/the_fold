const knex = require("../knex/knex.js");

var express = require("express");
var router = express.Router();
var loggedIn = require("./middleware/auth.middleware").loggedIn;
var loggedInAdmin = require("./middleware/auth.middleware").loggedInAdmin;
var randomstring = require("randomstring");

const ADMIN = "admin";
const MEMBER = "member";

router.get("/program*", (req, res) => {
  // let myUrl = req.path;
  // myUrl = decodeURI(myUrl.replace("/program/", ""));
  // if (myUrl != undefined) {
  //   knex
  //     .from("ward")
  //     .where("ward_code", myUrl)
  //     .then((rows) => {
  //       if (rows.length != 0) {
  //         let wardId = rows[0].id;

  //         let responseObject = {};
  //         responseObject.name = rows[0].name;
  //         responseObject.programJson = JSON.parse(rows[0].program_json);
  //         responseObject.permissionLevel = "";

  //         //normal, not logged in user
  //         let auth = req.get("authToken");
  //         if (auth == undefined) {
  //           res.json(responseObject);
  //         } else {
  //           knex
  //             .from("auth_token")
  //             .where("auth_token", auth)
  //             .then((rows) => {
  //               if (rows.length !== 0) {
  //                 let userId = rows[0].user_id;
  //                 knex
  //                   .from("user_in_ward")
  //                   .where({ ward_id: wardId, user_id: userId })
  //                   .then((rows) => {
  //                     if (rows.length != 0) {
  //                       //logged into this ward.
  //                       responseObject.permissionLevel =
  //                         rows[0].permission_level;
  //                       res.json(responseObject);
  //                     } else {
  //                       //not logged into ward but still logged in
  //                       res.send(responseObject);
  //                     }
  //                   });
  //               } else {
  //                 res.send(responseObject);
  //               }
  //             });
  //         }
  //       } else {
  //         res.send(400);
  //       }
  //     });
  // } else {
  //   res.send(400);
  // }
});

// TODO test
router.post("/program*", loggedInAdmin, (req, res) => {
  // if (req.body.programItems) {
  //   knex("ward")
  //     .where({ id: req.wardId })
  //     .update({ program_json: JSON.stringify(req.body) })
  //     .then(() => {
  //       res.send(200);
  //     });
  // } else {
  //   res.send(500);
  // }
});

router.post("/create", loggedIn, (req, res) => {
  // if (req.body.wardName != null) {
  //   knex
  //     .from("user_in_ward")
  //     .where({ user_id: req.userId, permission_level: ADMIN })
  //     .then((rows) => {
  //       var isAdmin = rows.length > 0;
  //       if (!isAdmin) {
  //         // ______start beta check _______
  //         knex.from("ward").then((rows) => {
  //           if (rows.length >= 10) {
  //             //store it in the beta requests table
  //             knex
  //               .from("user")
  //               .where({ id: req.userId })
  //               .then((rows) => {
  //                 knex("beta_ward_requests")
  //                   .insert({
  //                     email: rows[0].email,
  //                     ward_name: req.body.wardName,
  //                   })
  //                   .then(() => {
  //                     res.status(409).send();
  //                   });
  //               });
  //           } else {
  //             // _______end beta check ________
  //             knex("ward")
  //               .insert({
  //                 name: req.body.wardName,
  //                 program_json: "{}",
  //                 ward_code: createWardCode(),
  //               })
  //               .then((rows) => {
  //                 let wardId = rows[0];
  //                 knex("user_in_ward")
  //                   .insert({
  //                     user_id: req.userId,
  //                     ward_id: wardId,
  //                     permission_level: ADMIN,
  //                   })
  //                   .then(() => {
  //                     res.send(200);
  //                   });
  //               });
  //             //__start beta check close__
  //           }
  //         });
  //         // __end beta check close__
  //       } else {
  //         res.send(403);
  //       }
  //     });
  // } else {
  //   res.send(400);
  // }
});

router.post("/get_admin_ward_code", loggedInAdmin, (req, res) => {
  // knex
  //   .from("ward")
  //   .where({ id: req.wardId })
  //   .then((rows) => {
  //     res.send({ wardCode: rows[0].ward_code });
  //   });
});

module.exports = router;

function createWardCode() {
  var newCode = randomstring.generate({
    length: 6,
    charset: "BCDFGJKLMNPQRSTVWXYZ",
  });

  // Checks for duplicate ward codes
  
  // knex
  //     .from("ward")
  //     .where("ward_code", newCode)
  //     .then((rows) => {
  //       if (rows.length != 0) {
  //         createWardCode();
  //       }
  //     });
  
  return newCode;
}
