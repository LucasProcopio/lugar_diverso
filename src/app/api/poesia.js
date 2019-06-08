const poesia = require('../controllers/poesia')

module.exports = routes => {
  /**
   * Get accepted poems
   */
  routes.get('/poems', poesia.fetchAccepted)

  /**
   * Get not accepted poems
   */
  routes.get('/validate/poems', poesia.fetchNotAccepted)

  /**
   * Delete not accepted poems
   */
  routes.post('/delete/poem/:id', poesia.delete)

  /**
   * Create poem
   */
  routes.post('/create/poem', poesia.validate, poesia.create)

  /**
   * Accept poem
   */
  routes.post('/accept/poem/:id', poesia.accept)
}
