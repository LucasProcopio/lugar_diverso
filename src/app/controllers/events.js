const db = require('../models')
const { check, validationResult } = require('express-validator/check')
const helper = require('../helpers')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const uuidv1 = require('uuid/v1')

module.exports.create = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const uuid = uuidv1()
  let webPath = ''

  if (req.files !== null) {
    const imageFile = req.files.image
    const imageName = `${uuid}.jpg`
    const imagePublicPath = `${__dirname}/../../../public/images/`
    webPath = `${req.protocol}://${req.headers.host}/images/${imageName}`

    imageFile.mv(`${imagePublicPath}${imageName}`, function (err) {
      if (err) {
        return res.status(500).send('IMAGE ERROR'.err)
      }

      ;(async () => {
        await imagemin([`${imagePublicPath}${imageName}`], imagePublicPath, {
          plugins: [imageminMozjpeg({ quality: 50 })]
        })
      })()
    })
  }

  console.log(webPath)

  db.Event.create({
    title: req.body.title,
    about: req.body.about,
    date: req.body.date,
    location: req.body.location,
    image: webPath,
    time: req.body.time,
    available: true
  }).then(result => res.json(result))
}

module.exports.update = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const isDate = helper.isDate(req.body.date)

  if (!isDate) {
    return res.json({ errors: [{ msg: 'Data inválida' }] })
  }

  db.Event.update(
    {
      title: req.body.title,
      about: req.body.about,
      date: req.body.date,
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
      limit: limit,
      offset: offset,
      where: {
        available: true
      }
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
    .withMessage('O campo sobre não pode ser em branco'),
  check('date')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Data inválida'),
  check('time')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Horário inválido'),
  check('location')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('O campo local não pode estar em branco')
]

const fieldsUpdate = fields.concat(fields, [
  check('available')
    .isBoolean()
    .withMessage('O campo disponível deve ser verdadeiro ou falso')
])

module.exports.validate = fields
module.exports.validateUpdate = fieldsUpdate
