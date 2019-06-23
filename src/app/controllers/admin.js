const db = require('../models')
const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')
const jwt = require('jsonwebtoken')

const { check, validationResult } = require('express-validator/check')
// TODO: json token authentication

module.exports.create = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const hash = bcrypt.hashSync(req.body.password, 10)
  const uuid = uuidv1()

  db.Admin.findAll({
    where: {
      email: req.body.email
    }
  }).then(result => {
    if (result.length > 0) {
      return res
        .status(422)
        .json({ errors: 'E-mail informado já está em uso.' })
    } else {
      db.Admin.create({
        uuid: uuid,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash
      }).then(result => res.json(result))
    }
  })
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

// authentication
module.exports.auth = (req, res) => {
  db.Admin.findAll({
    where: {
      email: req.body.email
    }
  }).then(result => {
    const errMsg = 'E-mail ou Senha inválido'
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].dataValues.password, function (
        err,
        isCorrect
      ) {
        if (err) {
          return res
            .status(500)
            .json({ errors: 'Erro interno por favor tente novamente!' })
        } else if (isCorrect) {
          // hash comparison is true
          // issue token
          const payload = result[0].dataValues.email
          const token = jwt.sign(
            {
              data: payload
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
          )

          res
            .cookie('lugardiverso', token, { httpOnly: true })
            .status(200)
            .json({ token: token })
        } else {
          res.status(401).json({
            errors: errMsg
          })
        }
      })
    } else {
      res.status(401).json({ errors: errMsg })
    }
  })
}

// check token
module.exports.checkAuth = (req, res) => {
  res.sendStatus(200)
}

let fields = [
  check('firstName')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O nome não pode ser em branco.'),
  check('lastName')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O sobrenome não pode ser em branco.'),
  check('email')
    .isEmail()
    .normalizeEmail()
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
