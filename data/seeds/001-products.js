
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('whiskey').del()
    .then(function () {
      // Inserts seed entries
      return knex('whiskey').insert([
        {id: 1, name: 'Balvenie Doublewood', price: '69.99'},
        {id: 2, name: 'Laphroaig 10', price: '49.99'},
        {id: 3, name: 'Ardbeg 10', price: '49.99'},
        {id: 4, name: 'Glenfiddich 12', price: '49.99'},
        {id: 5, name: 'Willet', price: '39.99'},
        {id: 6, name: 'Southwell', price: '74.99'}
      ]);
    });
};
