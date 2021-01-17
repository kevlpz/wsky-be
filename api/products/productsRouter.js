const express = require('express');
const Products = require('./productsModel');

const router = express.Router();

router.get('/', (req, res) => {
    Products.get()
        .then(items => {
            res.status(200).json(items)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({error: 'Could not find products'})
        })
})

module.exports = router