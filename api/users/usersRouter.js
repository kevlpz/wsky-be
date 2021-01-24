const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require('./usersModel')
const passport = require('passport')
// const passport = require('passport')

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    Users.add({email, password: hashedPassword})
        .then(user => res.status(201).json({...user, password: undefined}))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not create user'})
        })
})

// Login
// router.post('/login', passport.authenticate('local'), (req, res) => {
//     console.log('login: ', res.user)
//     res.status(200).json(res.user)
// })

router.post('/login', passport.authenticate('local'))

// Get by email
router.get('/', (req, res) => {
    Users.getByEmail(req.body.email)
        .then(email => {
            res.status(200).json(email)
        })
        .catch(err => {
            console.log('catch err: ', err)
            res.status(500).json({error: 'Could not get users'})
        })
})

// Get user
router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err)
            res.status(404).json({error: 'Could not find user'})
        })
})

module.exports = router