const events = require('../controllers/events')

module.exports = routes => {
  /**
   * Get not available events
   */
  routes.get('/events/not-available', events.fetchNotAvailable)

  /**
   * Get paginated available events
   */
  routes.get('/events/:page', events.fetchEvents)

  /**
   * Create an event
   */
  routes.post('/create/event', events.validate, events.create)

  /**
   * Update an event
   */
  routes.post('/update/event/:id', events.validateUpdate, events.update)

  /**
   * Delete event
   */
  routes.post('/delete/event/:id', events.delete)
}
