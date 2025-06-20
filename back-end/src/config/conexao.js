const { Sequelize } = require('sequelize');
require('dotenv').config()

const Conexao = new Sequelize({
    dialect: process.env.DIALECT,
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB
})

module.exports = Conexao;