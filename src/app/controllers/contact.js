const db = require('../models')
const { check, validationResult } = require('express-validator/check')
const helper = require('../helpers')

module.exports.create = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const facebook = helper.stripTags(req.body.facebook)
  const instagram = helper.stripTags(req.body.instagram)

  db.Contact.create({
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    email: req.body.email,
    facebook: facebook,
    instagram: instagram
  }).then(result => res.json(result))
}

module.exports.update = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const facebook = helper.stripTags(req.body.facebook)
  const instagram = helper.stripTags(req.body.instagram)

  db.Contact.update(
    {
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      email: req.body.email,
      facebook: facebook,
      instagram: instagram
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(result => res.json(result))
}

module.exports.fetchContact = (req, res) => {
  db.Contact.findAll().then(result => res.json(result))
}

const fields = [
  check('phone')
    .isNumeric()
    .trim()
    .escape()
    .withMessage(
      'O campo telefone não pode estar em branco e deve conter apenas numeros.'
    ),
  check('address')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O campo de endereço não pode estar vazio'),
  check('city')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O campo cidade não pode estar vazio'),
  check('email')
    .isEmail()
    .trim()
    .escape()
    .withMessage('E-mail inválido')
]

module.exports.validate = fields
