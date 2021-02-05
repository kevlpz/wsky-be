const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const session = require('express-session')
const passport = require('passport')

const productsRouter = require('./products/productsRouter')
const usersRouter = require ('./users/usersRouter')
const cartsRouter = require('./carts/cartsRouter')

server.use(cors({
    origin: 'https://wsky.vercel.app',
    credentials: true
}))
// server.enable('trust proxy')
server.use(session({
    name: 'dram',
    secret: process.env.SECRET,
    // proxy: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        secure: true, // true for production
        httpOnly: false
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