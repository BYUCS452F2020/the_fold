const uuid = require("uuid").v4;
const knex = require("../knex/knex.js");
var express = require("express");
var router = express.Router();


/* logs a user in with their unique google id */
router.post("/google_login", (req, res) => {
  // if (req.body.googleId != undefined) {
  //   //grab the userid of the person
  //   knex
  //     .from("google_login")
  //     .where("google_id", req.body.googleId)
  //     .select("user_id")
  //     .then((rows) => {
  //       //create an auth token and insert it
  //       if (rows.length == 0) {
  //         res.send(401);
  //       } else {
  //         generateToken(rows[0].user_id).then((token) => {
  //           res.send(`{"authToken": "${token}"}`);
  //         });
  //       }
  //     });
  // } else {
  //   res.send(400);
  // }
});

/** registers a new google user */
router.post("/google_register", (req, res) => {
  // if (
  //   req.body.googleId != undefined &&
  //   req.body.name != undefined &&
  //   req.body.email != undefined
  // ) {
  //   knex
  //     .from("user")
  //     .where({ email: req.body.email })
  //     .then((rows) => {
  //       if (rows.length == 0) {
  //         // insert into user
  //         knex("user")
  //           .insert({ name: req.body.name, email: req.body.email }, "id")
  //           .then((rows) => {
  //             // insert into gLogin
  //             let userId = rows[0];
  //             knex("google_login")
  //               .insert({ user_id: userId, google_id: req.body.googleId })
  //               .then(() => {
  //                 generateToken(userId).then((token) => {
  //                   res.send(`{"authToken": "${token}"}`);
  //                 });
  //               });
  //           });
  //       } else {
  //         // insert into gLogin
  //         let userId = rows[0].id;
  //         knex("google_login")
  //           .insert({ user_id: userId, google_id: req.body.googleId })
  //           .then(() => {
  //             generateToken(userId).then((token) => {
  //               res.send(`{"authToken": "${token}"}`);
  //             });
  //           });
  //       }
  //     });
  // } else {
  //   res.send(400);
  // }
});

let generateToken = async (userId) => {
  let token = uuid();
  await knex("auth_token").insert({ user_id: userId, auth_token: token });
  return token;
};


module.exports = router;
