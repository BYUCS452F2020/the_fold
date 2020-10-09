
exports.up = function(knex) {
  return knex.schema
  .createTable('user', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('ward', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('program_json', 'mediumtext');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('auth_token', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.string('auth_token').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable('google_login', (table) => {
    table.increments('id').primary();
    table.string('google_id').notNullable();
    table.integer('user_id').notNullable();
  })
  .createTable('user_in_ward', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('ward_id');
    table.string('permission_level');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user').dropTable('ward').dropTable('auth_token').dropTable('google_login').dropTable('user_in_ward');
};
