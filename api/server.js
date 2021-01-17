const express = require('express')
const server = express()
const Cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const productsRouter = require('./products/productsRouter')

server.use('/products', productsRouter)

server.use(Cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

server.use(helmet())
server.use(express.json())

module.exports = server