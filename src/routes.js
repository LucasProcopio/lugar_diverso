const express = require('express')

const aboutApi = require('./app/api/about')
const AdminApi = require('./app/api/admin')

const routes = express.Router()

aboutApi(routes)
AdminApi(routes)

module.exports = routes
