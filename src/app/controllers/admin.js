const db = require('../models')
const bcrypt = require('bcrypt')
// TODO: json token authentication

module.exports.create = (req, res) => {
  // validate admin data here
  // validate all data to create new admins
  const hash = bcrypt.hashSync(req.body.password, 10)
  db.Admin.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
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
      username: req.body.username,
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
