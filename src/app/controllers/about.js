const db = require('../models')
const { check, validationResult } = require('express-validator/check')

module.exports.create = (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array() })
  }

  db.About.create({
    history: req.body.history,
    join_desc: req.body.join_desc
  }).then(result => res.json(result))
}

module.exports.fechAll = (req, res) => {
  db.About.findAll().then(result => res.json(result))
}

module.exports.fetchById = (req, res) => {
  db.About.findById(req.params.id).then(result => res.json(result))
}

module.exports.update = (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array() })
  }

  db.About.update(
    {
      history: req.body.history,
      join_desc: req.body.join_desc
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(result => res.json(result))
}

module.exports.delete = (req, res) => {
  db.About.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => res.json(result))
}

let fields = [
  check('history')
    .not()
    .isEmpty()
    .withMessage('O campo História não pode ser em branco'),
  check('join_desc')
    .not()
    .isEmpty()
    .withMessage('O campo como participar não pode ser em branco')
]

module.exports.validate = fields
