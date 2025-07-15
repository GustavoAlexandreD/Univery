const DataTypes = require('sequelize');
const Conexao = require('../config/conexao.js');

const Estabelecimento = Conexao.define("Estabelecimento", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    cnpj: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    telefone: { 
        type: DataTypes.STRING 
    },
    email: { 
        type: DataTypes.STRING
    },
    senha: { 
        type: DataTypes.STRING 
    }
}, 
{
  tableName: "estabelecimento",
  timestamps: false
});

module.exports = Estabelecimento;
