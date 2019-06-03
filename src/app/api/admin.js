const admin = require('../controllers/admin')

module.exports = routes => {
  /**
   * Fetch information of the admins
   */
  routes.get('/admin/list', admin.fecthAll)

  /**
   * Create new admin record
   */
  routes.post('/admin', admin.validate, admin.create)

  /**
   * Update admin information
   */
  routes.put('/admin/:id', admin.update)
}
