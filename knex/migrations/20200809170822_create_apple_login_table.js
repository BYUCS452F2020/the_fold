
exports.up = function(knex) {
  return knex.schema
  .createTable('apple_login', (table) => {
    table.increments('id').primary();
    table.string('apple_id').notNullable();
    table.integer('user_id').notNullable();
  })

};

exports.down = function(knex) {
  return knex.schema.dropTable('apple_login')
};
