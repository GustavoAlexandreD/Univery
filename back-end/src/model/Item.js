const { DataTypes } = require('sequelize');
const Conexao = require('../config/conexao.js');

const Item = Conexao.define("Item", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  descricao: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  preco: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  id_estabelecimento: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  disponibilidade: {
    type: DataTypes.ENUM('disponivel', 'esgotado'),
    allowNull: false,
    defaultValue: 'disponivel'
  }
}, {
  tableName: "item",
  timestamps: false
});
