const admin = require('../controllers/admin')
const withAuth = require('../middleware/auth')

module.exports = routes => {
  /**
   * Fetch information of the admins
   */
  routes.get('/admin/list', withAuth, admin.fecthAll)

  /**
   * Create new admin record
   */
  routes.post('/admin', withAuth, admin.validate, admin.create)

  /**
   * Update admin information
   */
  routes.put('/admin/:id', withAuth, admin.updateValidation, admin.update)

  /**
   * Authentication
   */
  routes.post('/admin/auth', admin.auth)

  /**
   * send 200 status code if requester has a valid token
   */
  routes.get('/admin/check-token', withAuth, admin.checkAuth)
}
