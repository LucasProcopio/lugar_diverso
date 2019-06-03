const db = require('../models')

module.exports.create = (req, res) => {
  // TODO: validate all data
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
  // TODO: validate all data
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
