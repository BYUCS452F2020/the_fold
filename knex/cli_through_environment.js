//this file lets you run knex commands from environment variables.
const environment = process.env.ENVIRONMENT || "development";
const config = require("../knexfile.js")[environment];
var knex = require("./knex");

function runKnex() {
  if (process.env.KNEX == "update") {
    knex.migrate.latest();
  }
}

module.exports = runKnex;
