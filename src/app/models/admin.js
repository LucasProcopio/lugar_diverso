'use strict'
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      uuid: DataTypes.STRING,
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  )
  Admin.associate = function (models) {
    // associations can be defined here
  }
  return Admin
}
