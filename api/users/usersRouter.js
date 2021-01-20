const express = require('express')
const bcrypt = require('bcryptjs')

const Users = require('./usersModel')
// const passport = require('passport')

const router = express.Router()

// Register
router.post('/register', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            Users.add(req.body)
                .then(user => res.status(201).json(user))
                .catch(err => {
                    console.log(err)
                    res.status(400).json({error: 'Could not create user'})
                })
        })
    })
})

// Get user
router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err)
            res.status(404).json(error: "Could not find user")
        })
})

module.exports = router