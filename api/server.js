const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const productsRouter = require('./products/productsRouter')
const usersRouter = require ('./users/usersRouter')

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
server.use(helmet())
server.use(express.json())
server.use('/products', productsRouter)
server.use('/users', usersRouter)

module.exports = server