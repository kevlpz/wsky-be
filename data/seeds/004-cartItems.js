
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cartItems').del()
    .then(function () {
      // Inserts seed entries
      return knex('cartItems').insert([
        {id: 1, productID: 1, cartID: 1, quantity: 3},
        {id: 2, productID: 2, cartID: 2, quantity: 2},
        {id: 3, productID: 3, cartID: 3, quantity: 5}
      ]);
    });
};
