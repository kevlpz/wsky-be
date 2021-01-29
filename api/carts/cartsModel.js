const db = require('../../data/knexConfig.js')

module.exports = {
    get,
    add,
    del,
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

function del(id) {
    return db('cartItems')
        .where({id: id})
        .del()
        .then(res => console.log(res))
}

function getByUserId(id) {
    return db('carts')
        .leftJoin('cartItems', 'carts.id', 'cartItems.cartID')
        .join('whiskey', 'whiskey.id', 'productID')
        .select('whiskey.id as productID', 'quantity', 'name', 'price', 'img', 'cartItems.id as itemID')
        .where({userID: id})
}