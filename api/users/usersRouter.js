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

router.get('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) { return res.status(404).json({error: 'User not found'}) }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        return res.status(201).json(user)
      })
    })(req, res, next)
  })

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