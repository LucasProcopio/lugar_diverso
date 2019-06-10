const contact = require('../controllers/contact')

module.exports = routes => {
  /**
   * Create contact data
   */
  routes.post('/create/contact', contact.validate, contact.create)

  /**
   * Update contact
   */
  routes.post('/update/contact/:id', contact.validate, contact.update)

  /**
   * Fetch contact
   */
  routes.get('/contact', contact.fetchContact)
}
