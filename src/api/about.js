module.exports = (app, db) => {
  /**
   * Obtem dados da tabela sobre pelo ID
   */
  app.get('/about/:id', (req, res) => {
    db.about.findById(req.params.id).then(result => res.json(result))
  })

  /**
   * Insere os dados na tabela sobre
   */
  app.post('/about', (req, res) => {
    db.about
      .create({
        history: req.body.history,
        join_desc: req.body.join_desc
      })
      .then(result => res.json(result))
  })

  /**
   * Atualiza os dados da tabela sobre pelo ID
   */
  app.put('/about/:id', (req, res) => {
    db.about
      .update(
        {
          history: req.body.history,
          join_desc: req.body.join_desc
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(result => res.json(result))
  })

  /**
   * Deleta os dados ta tabela sobre pelo ID
   */
  app.delete('/about/:id', (req, res) => {
    db.about
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  })
}
