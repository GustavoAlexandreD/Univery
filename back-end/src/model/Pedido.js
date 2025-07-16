const { DataTypes } = require('sequelize');
const Conexao = require('../config/conexao');

const Pedido = Conexao.define("Pedido", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
  data: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: "pedido",
  timestamps: false
});

module.exports = Pedido;
