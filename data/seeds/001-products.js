
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('whiskey').del()
    .then(function () {
      // Inserts seed entries
      return knex('whiskey').insert([
        {id: 1, name: 'Balvenie Doublewood', price: '69.99', img: 'https://wsky.s3.us-east-2.amazonaws.com/assets/doublewood.jpg'},
        {id: 2, name: 'Laphroaig 10', price: '49.99', img: 'https://wsky.s3.us-east-2.amazonaws.com/assets/laphroaig10.jpg'},
        {id: 3, name: 'Ardbeg 10', price: '49.99', img: 'https://wsky.s3.us-east-2.amazonaws.com/assets/ardbeg10.jpg'},
        {id: 4, name: 'Glenfiddich 12', price: '49.99', img: 'https://wsky.s3.us-east-2.amazonaws.com/assets/glenfiddich12.jpg'},
        {id: 5, name: 'Willet', price: '39.99', img: 'https://wsky.s3.us-east-2.amazonaws.com/assets/willet.jpg'},
        {id: 6, name: 'Southwell', price: '74.99', img: 'https://wsky.s3.us-east-2.amazonaws.com/assets/southwell.jpg'}
      ]);
    });
};
