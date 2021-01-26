const db = require('../../data/knexConfig.js')

module.exports = {
    get,
    getByCategory
}

function get() {
    return db('whiskey')
}

function getByCategory(categoryID) {
    return db('whiskey')
        .where({ categoryID: categoryID })
}