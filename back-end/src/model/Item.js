const DataTypes  = require('sequelize');
const Conexao = require('../config/conexao.js');
const ItemPedido = require("../model/ItemPedido.js")
const Estabelecimento = require("../model/Estabelecimento.js")
const Pedido = require("../model/Estabelecimento.js")

const Item = Conexao.define("Item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  id_estabelecimento: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "item",
  timestamps: false
});

Item.belongsTo(Estabelecimento, { foreignKey: "id_estabelecimento" });
Item.belongsToMany(Pedido, {
  through: ItemPedido,
  foreignKey: "id_item",
  otherKey: "id_pedido"
});
module.exports = Item;