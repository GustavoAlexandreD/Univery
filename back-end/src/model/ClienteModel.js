const { DataTypes } = require('sequelize');
const Conexao = require('../config/conexao.js');

const ClienteModel = Conexao.define(
    "ClienteModel", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: false, 
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entregador: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, 
    {
        tableName: 'Clientes'
    }
);

module.exports = ClienteModel;
