const DataTypes  = require('sequelize');
const Conexao = require('../config/conexao.js');

const Estabelecimento = require("../model/Estabelecimento.js")
const Pedido = require("../model/Pedido.js")
const Estabelecimento = require("../model/EntregadorEstabelecimento.js")
const Cliente = require("../model/EntregadorCliente.js")

const Pedido = Conexao.define("Pedido", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false },
  id_cliente: { type: DataTypes.INTEGER, allowNull: false },
  id_estabelecimento: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "pedido",
  timestamps: false
});

Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" });
Pedido.belongsTo(Estabelecimento, { foreignKey: "id_estabelecimento" });

Pedido.belongsToMany(Item, {
  through: ItemPedido,
  foreignKey: "id_pedido",
  otherKey: "id_item"
});

module.exports = Pedido;