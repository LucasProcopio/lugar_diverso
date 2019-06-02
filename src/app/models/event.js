'use strict'
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      location: DataTypes.TEXT,
      about: DataTypes.TEXT,
      image: DataTypes.STRING,
      available: DataTypes.BOOLEAN
    },
    {}
  )
  Event.associate = function (models) {
    // associations can be defined here
  }
  return Event
}
