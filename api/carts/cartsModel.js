const db = require('../../data/knexConfig.js')

module.exports = {
    get,
    add,
    getByUserId,
}

function get(id) {
    return db('carts')
        .join('cartItems', 'carts.id', 'cartItems.cartID')
        .where({userID: id})
}

function add(item) {
    return db('cartItems')
        .insert(item, 'cartID')
        .then(() => get(item.cartID))
}

function getByUserId(id) {
    return db('carts')
        .leftJoin('cartItems', 'carts.id', 'cartItems.cartID')
        .join('whiskey', 'whiskey.id', 'productID')
        .select('whiskey.id', 'quantity', 'name', 'price', 'img')
        .where({userID: id})
}