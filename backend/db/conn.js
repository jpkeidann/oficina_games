const { Sequelize } = require('sequelize')
const db = new Sequelize('db_pixelfix', 'root', 'senai*', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db