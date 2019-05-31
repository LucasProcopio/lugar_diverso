const express = require('express')
const db = require('./app/models')
const faker = require('faker')
const times = require('lodash.times')
const random = require('lodash.random')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json('hello world')
})

routes.get('/populate', (req, res) => {
  db.Sequelize.sync().then(() => {
    db.About.bulkCreate(
      times(1, () => ({
        history: faker.lorem.sentence(),
        join_desc: faker.lorem.paragraph(),
        id: random(1, 10)
      }))
    )
  })
})

module.exports = routes
