'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('about', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      history: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      join_desc: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('about')
  }
}
