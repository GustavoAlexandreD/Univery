const { DataTypes } = require('sequelize');
const Conexao = require('../config/conexao');

const Estabelecimento = Conexao.define("Estabelecimento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cnpj: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  senha: { type: DataTypes.STRING, allowNull: false },
  ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: "estabelecimento",
  timestamps: false
});

module.exports = Estabelecimento;
