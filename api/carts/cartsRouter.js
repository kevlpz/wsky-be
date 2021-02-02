const express = require('express');
const Carts = require('./cartsModel');

const router = express.Router();

// Add to cart
router.post('/', (req, res) => {
    const { productID } = req.body
    if(!req.user) {
        res.status(401).json({error: 'Must be logged in'})
    } else {
        Carts.add({
            productID,
            userID: req.user.id
        })
        .then(item => {
            console.log('item: ', item)
            res.status(201).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
    }
})

// Get cart by user
router.get('/', (req, res) => {
    if(!req.user) {
        res.status(401).json({error: 'Must be logged in'})
    } else {
        Carts.getByUserId(req.user.id)
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({error: 'Could not find cart'})
            })
    }
})

// Remove from cart
router.delete('/:id', (req, res) => {
    if(!req.user) {
        res.status(404).json({error: 'Must be logged in'})
    } else {
        Carts.del(req.params.id)
            .then(response => res.status(200).json(response))
            .catch(err => {
                console.log(err)
                res.status(500).json({error: 'Internal server error'})
            })
    }
})


// Update item quantity
router.put('/', (req, res) => {
    const { productID, quantity } = req.body
    const userID = req.user.id 

    if(!req.user) {
        res.status(404).json({error: 'Must be logged in'})
    } else {
        Carts.update(productID, userID, quantity)
            .then(item => res.status(201).json(item))
            .catch(err => {
                console.log(err)
                res.status(500).json({error: 'Internal server error'})
            })
    }
})

module.exports = router