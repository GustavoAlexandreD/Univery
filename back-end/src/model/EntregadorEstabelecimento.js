const DataTypes  = require('sequelize');
const Conexao = require('../config/conexao.js');

const Item = Conexao.define("EntregadorEstabelecimento", {
  id_entregador: { type: DataTypes.INTEGER, primaryKey: true },
  id_estabelecimento: { type: DataTypes.INTEGER, primaryKey: true },
  disponivel: { type: DataTypes.BOOLEAN, allowNull: false}
}, {
  tableName: "entregador_estabelecimento",
  timestamps: false
});

module.exports = Item;