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
        .where({ userID: item.userID })
        .insert(item)
        .onConflict(['productID', 'userID'])
        .merge({quantity: db.raw('`quantity` + 1')})
}

function update(id, quantity) {
    return db('cartItems')
        .where({ id: id })
        .update({ quantity: quantity })
        .then(id => getItemById(id))
}

function del(id) {
    return db('cartItems')
        .where({ id: id })
        .del()
}

function getByUserId(id) {
    console.log('id: ', id)
    return db('cartItems')
        .join('whiskey', 'whiskey.id', 'cartItems.productID')
        .where({ userID: id })
        .select('userID', 'whiskey.id as productID', 'quantity', 'name', 'price', 'img')
}

function getItemById(id) {
    console.log('getbyid')
    return db('cartItems')
        .where({ id: id })
        .first()
}