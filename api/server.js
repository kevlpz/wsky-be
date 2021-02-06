const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const session = require('express-session')
// const pgSession = require('connect-pg-simple')(session)
const KnexSessionStore = require('connect-session-knex')(session)
const passport = require('passport')
const knex = require('../data/knexConfig')

const productsRouter = require('./products/productsRouter')
const usersRouter = require ('./users/usersRouter')
const cartsRouter = require('./carts/cartsRouter')

server.use(cors({
    origin: 'https://wsky-fe.herokuapp.com',
    credentials: true
}))
// server.enable('trust proxy')
server.use(session({
    store: new KnexSessionStore({
        knex
    }),
    name: 'dram',
    secret: process.env.SECRET,
    // proxy: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        secure: true, // true for production
        httpOnly: false,
        // domain: '.wsky.vercel.app'
    },
    resave: false,
    saveUninitialized: false // false for production
}))
server.use(passport.initialize())
server.use(passport.session())
require('./passportConfig')(passport)
server.use(helmet())
server.use(express.json())
server.use('/products', productsRouter)
server.use('/users', usersRouter)
server.use('/cart', cartsRouter)

module.exports = server