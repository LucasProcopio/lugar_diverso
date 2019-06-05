const db = require('../models')
const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')

const { check, validationResult } = require('express-validator/check')
// TODO: json token authentication

module.exports.create = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const hash = bcrypt.hashSync(req.body.password, 10)
  const uuid = uuidv1()

  db.Admin.create({
    uuid: uuid,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash
  }).then(result => res.json(result))
}

module.exports.update = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const hash = bcrypt.hashSync(req.body.password, 10)
  db.Admin.update(
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash
    },
    {
      where: {
        uuid: req.body.uuid
      }
    }
  ).then(result => res.json(result))
}

module.exports.fecthAll = (req, res) => {
  db.Admin.findAll({
    attributes: ['uuid', 'firstname', 'lastname']
  }).then(result => res.json(result))
}

let fields = [
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('O nome não pode ser em branco.'),
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('O sobrenome não pode ser em branco.'),
  check('email')
    .isEmail()
    .withMessage('E-mail inválido.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Senha inválida, a senha deve possuir no mínimo 6 caracteres.')
]

const updateFields = fields.concat(fields, [
  check('uuid')
    .isUUID()
    .withMessage('ID inválido')
])
module.exports.validate = fields
module.exports.updateValidation = updateFields
