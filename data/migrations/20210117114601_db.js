
exports.up = function(knex) {
  return knex.schema.createTable('whiskey', tbl => {
      tbl.increments()
      tbl.string('name').notNullable()
      tbl.string('price').notNullable()
      tbl.string('img').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('whiskey');
};
