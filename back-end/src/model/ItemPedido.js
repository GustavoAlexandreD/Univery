const DataTypes  = require('sequelize');
const Conexao = require('../config/conexao.js');

const ItemPedido = Conexao.define("ItemPedido", {
  id_pedido: { type: DataTypes.INTEGER, primaryKey: true },
  id_item: { type: DataTypes.INTEGER, primaryKey: true },
  quantidade: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "item_pedido",
  timestamps: false
});

module.exports = ItemPedido