const db = require('../models')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator/check')
// TODO: json token authentication

module.exports.create = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const hash = bcrypt.hashSync(req.body.password, 10)
  db.Admin.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash
  }).then(result => res.json(result))
}

module.exports.update = (req, res) => {
  // none can be empty, password needs a validation
  // pass min 6 chars
  // validate all data here
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
        id: req.params.id
      }
    }
  ).then(result => res.json(result))
}

module.exports.fecthAll = (req, res) => {
  db.Admin.findAll({
    attributes: ['firstname', 'lastname']
  }).then(result => res.json(result))
}

module.exports.validate = [
  check('firstName').isAlpha(),
  check('lastName').isAlpha(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
]
