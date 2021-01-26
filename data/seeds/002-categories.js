
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'scotch'},
        {id: 2, name: 'bourbon'},
        {id: 3, name: 'irish'},
        {id: 4, name: 'canadian'},
        {id: 5, name: 'other'}
      ]);
    });
};
