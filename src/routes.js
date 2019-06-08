const express = require('express')

const aboutApi = require('./app/api/about')
const adminApi = require('./app/api/admin')
const poemApi = require('./app/api/poesia')

const routes = express.Router()

aboutApi(routes)
adminApi(routes)
poemApi(routes)

module.exports = routes
