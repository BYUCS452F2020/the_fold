
exports.up = function(knex) {
  return knex.schema.createTable("beta_ward_requests", (table) => {
    table.increments('id').primary();
    table.string("email");
    table.string("ward_name")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("beta_ward_requests");
};
