const db = require('../models')
const { check, validationResult } = require('express-validator/check')

module.exports.create = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  db.Poesia.create({
    image: req.body.image,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website,
    author: req.body.author,
    title: req.body.title,
    text: req.body.text,
    accepted: false
  }).then(result => res.json(result))
}

module.exports.accept = (req, res) => {
  db.Poesia.update(
    {
      accepted: true
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
}

module.exports.fetchAccepted = (req, res) => {
  db.Poesia.findAll({
    where: {
      accepted: true
    }
  }).then(result => res.json(result))
}

module.exports.fetchNotAccepted = (req, res) => {
  db.Poesia.findAll({
    where: {
      accepted: false
    }
  }).then(result => res.json(result))
}

// TODO: pagination of poesias

module.exports.delete = (req, res) => {
  db.Poesia.destroy({
    where: {
      id: req.params.id,
      accepted: false
    }
  }).then(result => res.json(result))
}

let fields = [
  check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('E-mail inválido.'),
  check('phone')
    .isNumeric()
    .trim()
    .escape()
    .withMessage('O telefone deve conter somente numeros.'),
  check('author')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O nome do autor deve ser informado.'),
  check('title')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O titulo da poesia deve ser preenchido.'),
  check('text')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('A poesia deve ser preenchida.')
]

module.exports.validate = fields
