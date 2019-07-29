require('dotenv/config')
module.exports = {
  database: process.env.DB_NAME, 
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
}
