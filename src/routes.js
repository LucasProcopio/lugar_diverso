const express = require('express')

const aboutApi = require('./app/api/about')
const adminApi = require('./app/api/admin')
const poemApi = require('./app/api/poesia')
const contactApi = require('./app/api/contact')

const routes = express.Router()

aboutApi(routes)
adminApi(routes)
poemApi(routes)
contactApi(routes)

module.exports = routes
