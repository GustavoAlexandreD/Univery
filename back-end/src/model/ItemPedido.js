const { DataTypes } = require('sequelize');
const sequelize = require('../config/conexao'); // ajuste o caminho conforme sua config

const ItemPedido = sequelize.define('ItemPedido', {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Pedido',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Item',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'item_pedido',
  timestamps: false
});

module.exports = ItemPedido;
