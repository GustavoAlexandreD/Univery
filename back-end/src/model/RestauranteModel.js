const { DataTypes } = require('sequelize');
const Conexao = require('../config/conexao.js');

const RestauranteModel = Conexao.define(
    "RestauranteModel", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(100), // Nome do estabelecimento
            allowNull: false
        },
        cnpj: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
            validate: {
                is: /^\d{14}$/ // Aceita apenas 14 dígitos numéricos
            }
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, 
    {
        tableName: 'Restaurantes'
    }
);

module.exports = RestauranteModel;
