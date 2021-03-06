const express = require('express')
require('dotenv/config')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.middlewares()
    this.routes()
  }

  middlewares () {
    // express body parser
    this.express.use(express.json())
    this.express.use(express.static('public'))

    // file upload
    this.express.use(fileupload())

    // cookie parser
    this.express.use(cookieParser())

    // Add headers
    this.express.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_WEBSITE || 'http://lugardiverso.surge.sh' )

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

      // Request headers you wish to allow
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
      )

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true)

      // Pass to next layer of middleware
      next()
    })
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
