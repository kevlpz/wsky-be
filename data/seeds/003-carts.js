
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('carts').del()
    .then(function () {
      // Inserts seed entries
      return knex('carts').insert([
        {id: 1, UserID: 1},
        {id: 2, UserID: 2},
        {id: 3, UserID: 3}
      ]);
    });
};
