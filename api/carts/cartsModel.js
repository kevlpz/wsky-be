const { where } = require('../../data/knexConfig.js')
const db = require('../../data/knexConfig.js')

module.exports = {
    get,
    add,
    update,
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

function update(id, quantity) {
    return db('cartItems')
        .where({id: id})
        .update({quantity: quantity})
        .then(id => getItemById(id))
}

function del(id) {
    return db('cartItems')
        .where({id: id})
        .del()
}

function getByUserId(id) {
    return db('carts')
        .leftJoin('cartItems', 'carts.id', 'cartItems.cartID')
        .join('whiskey', 'whiskey.id', 'productID')
        .select('whiskey.id as productID', 'quantity', 'name', 'price', 'img', 'cartItems.id as itemID')
        .where({userID: id})
}

function getItemById(id) {
    return db('cartItems')
        .where({id: id})
        .first()
}