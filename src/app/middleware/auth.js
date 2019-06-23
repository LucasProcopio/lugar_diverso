const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY
const withAuth = function (req, res, next) {
  const token =
    req.body.lugardiverso ||
    req.query.lugardiverso ||
    req.headers['x-access-token'] ||
    req.cookies.lugerdiverso
  console.log('TOKEN: ', req.cookies)
  if (!token) {
    res
      .status(401)
      .send('Não tem autorização: Token de acesso não providenciado')
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Não tem autorização:: Token inválido')
      } else {
        req.email = decoded.email
        next()
      }
    })
  }
}
module.exports = withAuth
