
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
    .createTable('carts', tbl => {
      tbl.increments()
      tbl
        .integer('userID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    })
    .createTable('cartItems', tbl => {
      tbl.increments()
      tbl
        .integer('productID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('whiskey')
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      tbl
        .integer('cartID')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('carts')
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      tbl.integer('quantity').notNullable()
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('carts')
    .dropTableIfExists('categories')
    .dropTableIfExists('users')
    .dropTableIfExists('whiskey')
}
