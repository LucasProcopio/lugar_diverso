const db = require('../models')
const { check, validationResult } = require('express-validator/check')
const helper = require('../helpers')
const uuidv1 = require('uuid/v1')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports.create = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const author = helper.stripTags(req.body.author)
  const title = helper.stripTags(req.body.title)
  const text = helper.stripTags(req.body.text)
  const website = helper.stripTags(req.body.website)
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

  db.Poesia.create({
    image: webPath,
    email: req.body.email,
    phone: req.body.phone,
    website: website,
    author: author,
    title: title,
    text: text,
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
  ).then(result => res.json(result))
}

module.exports.fetchAccepted = (req, res) => {
  const limit = 6
  let offset = 0
  db.Poesia.findAndCountAll({
    where: {
      accepted: true
    }
  }).then(result => {
    const page = req.params.page
    const pages = Math.ceil(result.count / limit)
    offset = limit * (page - 1)

    db.Poesia.findAll({
      attributes: ['title', 'text', 'author', 'image', 'website', 'email'],
      limit: limit,
      offset: offset
    }).then(poems =>
      res.json({ results: poems, count: result.count, pages: pages })
    )
  })
}

module.exports.fetchNotAccepted = (req, res) => {
  db.Poesia.findAll({
    where: {
      accepted: false
    }
  }).then(result => res.json(result))
}

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
    .trim()
    .escape()
    .withMessage('O telefone não pode ser em branco'),
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
