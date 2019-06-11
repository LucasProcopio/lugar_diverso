const about = require('../controllers/about')

module.exports = routes => {
  /**
   * fetch all about data
   */
  routes.get('/about', about.fechAll)

  /**
   * fetch data by ID
   */
  routes.get('/about/:id', about.fetchById)

  /**
   * Insert data
   */
  routes.post('/about', about.validate, about.create)

  /**
   * Update about data by ID
   */
  routes.post('/about/:id', about.validate, about.update)

  /**
   * Deleta os dados ta tabela sobre pelo ID
   */
  routes.delete('/about/:id', about.delete)
}
