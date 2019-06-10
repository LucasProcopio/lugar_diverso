'use strict'
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    // TODO create, get , uptade contact api
    'Contact',
    {
      phone: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      email: DataTypes.STRING,
      facebook: DataTypes.STRING,
      instagram: DataTypes.STRING
    },
    {}
  )
  Contact.associate = function (models) {
    // associations can be defined here
    // Contact.belongsTo(models.About)
  }
  return Contact
}
