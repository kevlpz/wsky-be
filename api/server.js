const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const productsRouter = require('./products/productsRouter')


server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

server.use('/products', productsRouter)
// server.use(Cors())

server.use(helmet())
server.use(express.json())

module.exports = server