'use strict'
module.exports = (sequelize, DataTypes) => {
  const About = sequelize.define(
    'About',
    {
      history: DataTypes.STRING,
      join_desc: DataTypes.STRING
    },
    {
      freezeTableName: true,
      tableName: 'About'
    }
  )
  About.associate = function (models) {
    // associations can be defined here
    // About.hasOne(models.Contact)
  }
  return About
}
