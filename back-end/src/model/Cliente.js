const DataTypes  = require('sequelize');
const Conexao = require('../config/conexao.js');

const Cliente = Conexao.define(
    "Cliente", 
    {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        nome: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true },
        senha: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        telefone: { 
            type: DataTypes.STRING 
        },
        tipo: { 
            type: DataTypes.STRING 
        }
        }, 
        {
            tableName: "cliente",
            timestamps: false
        });

module.exports = Cliente;
