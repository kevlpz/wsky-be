const db = require('../../data/knexConfig.js')

module.exports = {
    get
}

function get() {
    return db('whiskey')
}