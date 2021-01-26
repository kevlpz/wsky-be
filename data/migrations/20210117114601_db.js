
exports.up = function (knex) {
  return knex.schema
    .createTable('categories', tbl => {
      tbl.increments()
      tbl.string('name').notNullable().unique()
    })

    .createTable('whiskey', tbl => {
      tbl.increments()
      tbl.string('name').notNullable()
      tbl.string('price').notNullable()
      tbl.string('img').notNullable()
      tbl
        .integer('categoryID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    })
    .createTable('users', tbl => {
      tbl.increments()
      tbl.string('email').notNullable().unique()
      tbl.string('password').notNullable()
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('categories')
    .dropTableIfExists('users')
    .dropTableIfExists('whiskey')
}
