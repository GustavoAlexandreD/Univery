const DataTypes  = require('sequelize');
const Conexao = require('../config/conexao.js');

const Pedido = Conexao.define("Pedido", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false },
  id_cliente: { type: DataTypes.INTEGER, allowNull: false },
  id_estabelecimento: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "pedido",
  timestamps: false
});

module.exports = Pedido;