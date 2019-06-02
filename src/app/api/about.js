const about = require('../controllers/about')

module.exports = routes => {
  /**
   * Obtem todos os dados da tabela sobre
   */
  routes.get('/about', about.fechAll)

  /**
   * Obtem dados da tabela sobre pelo ID
   */
  routes.get('/about/:id', about.fetchById)

  /**
   * Insere os dados na tabela sobre
   */
  routes.post('/about', about.create)

  /**
   * Atualiza os dados da tabela sobre pelo ID
   */
  routes.put('/about/:id', about.update)

  /**
   * Deleta os dados ta tabela sobre pelo ID
   */
  routes.delete('/about/:id', about.delete)
}
