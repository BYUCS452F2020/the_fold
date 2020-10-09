
exports.up = function(knex) {
  return knex.schema.table('ward', (table) => {
      table.string('ward_code')
  })
};

exports.down = function(knex) {
    return knex.schema.table('ward', (table) => {
        table.dropColumn('ward_code')
    })
};
