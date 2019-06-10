const db = require('../models')
const { check, validationResult } = require('express-validator/check')

module.exports.create = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  db.Event.create({
    title: req.body.title,
    about: req.body.about,
    date: req.body.data,
    location: req.body.location,
    image: req.body.image,
    available: true
  }).then(result => res.json(result))
}

module.exports.update = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  db.Event.update(
    {
      title: req.body.title,
      about: req.body.about,
      date: req.body.data,
      location: req.body.location,
      image: req.body.image,
      available: req.body.available
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(result => res.json(result))
}

module.exports.delete = (req, res) => {
  db.Event.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => res.json(result))
}

module.exports.fetchEvents = (req, res) => {
  const limit = 5
  let offset = 0
  db.Event.findAndCountAll({
    where: {
      available: true
    }
  }).then(result => {
    const page = req.params.page
    const pages = Math.ceil(result.count / limit)
    offset = limit * (page - 1)

    db.Event.findAll({
      attributes: ['title', 'about', 'date', 'location', 'image'],
      limit: limit,
      offset: offset
    }).then(events =>
      res.json({ events: events, count: result.count, pages: pages })
    )
  })
}

module.exports.fetchNotAvailable = (req, res) => {
  db.Event.findAll({
    where: {
      available: false
    }
  }).then(result => res.json(result))
}

let fields = [
  check('title')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O titulo não pode estar em branco'),
  check('about')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O campo sobre não pode ser em branco'),
  check('date')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O campo de data não pode estar em branco'),
  check('location')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O campo local não pode estar em branco'),
  check('image')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('A imagem deve ser enviada')
]

const fieldsUpdate = fields.concat(fields, [
  check('available')
    .isBoolean()
    .withMessage('O campo disponível deve ser verdadeiro ou falso')
])

module.exports.validate = fields
module.exports.validateUpdate = fieldsUpdate
