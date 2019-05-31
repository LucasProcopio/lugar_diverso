module.exports = (app, db) => {
  /**
   * Obtem todos os dados da tabela sobre
   */
  app.get('/about', (req, res) => {
    db.About.findAll().then(result => res.json(result))
  })

  /**
   * Obtem dados da tabela sobre pelo ID
   */
  app.get('/about/:id', (req, res) => {
    db.About.findById(req.params.id).then(result => res.json(result))
  })

  /**
   * Insere os dados na tabela sobre
   */
  app.post('/about', (req, res) => {
    db.About.create({
      history: req.body.history,
      join_desc: req.body.join_desc
    }).then(result => res.json(result))
  })

  /**
   * Atualiza os dados da tabela sobre pelo ID
   */
  app.put('/about/:id', (req, res) => {
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
  })

  /**
   * Deleta os dados ta tabela sobre pelo ID
   */
  app.delete('/about/:id', (req, res) => {
    db.About.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => res.json(result))
  })
}
