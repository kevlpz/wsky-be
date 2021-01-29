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

router.get('/:categoryid', (req, res) => {
    console.log('id: ', req.params.categoryid)
    Products.getByCategory(req.params.categoryid)
        .then(products => res.status(200).json(products))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not get products'})
        })
})

module.exports = router