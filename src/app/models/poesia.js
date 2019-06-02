'use strict'
module.exports = (sequelize, DataTypes) => {
  const Poesia = sequelize.define(
    'Poesia',
    {
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      website: DataTypes.STRING,
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      text: DataTypes.TEXT,
      accepted: DataTypes.BOOLEAN
    },
    {
      freezeTableName: true,
      tableName: 'Poesia'
    }
  )
  Poesia.associate = function (models) {
    // associations can be defined here
  }
  return Poesia
}
