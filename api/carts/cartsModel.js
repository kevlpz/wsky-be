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
        .where({ userID: id })
}

function add(item) {
    return db('cartItems')
        .insert({productID: item.productID, userID: item.userID})
        .onConflict(['productID', 'userID'])
        .merge({quantity: db.raw('`quantity` + 1')})
}

function update(productID, userID, quantity) {
    return db('cartItems')
        .where({ productID: productID, userID: userID })
        .update({ quantity: quantity })
}

function del(productID, userID) {
    return db('cartItems')
        .where({ productID: productID, userID: userID })
        .del()
}

function getByUserId(id) {
    return db('cartItems')
        .join('whiskey', 'whiskey.id', 'cartItems.productID')
        .where({ userID: id })
        .select('whiskey.id as productID', 'quantity', 'name', 'price', 'img')
}