const DataTypes  = require('sequelize');
const Conexao = require('../config/conexao.js');
const EntregadorEstabelecimento = require("../model/EntregadorEstabelecimento.js")
const Pedido = require("../model/Pedido.js")

const Cliente = Conexao.define(
    "Cliente", 
    {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        nome: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true },
        senha: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        telefone: { 
            type: DataTypes.STRING 
        },
        tipo: { 
            type: DataTypes.STRING 
        }
        }, 
        {
            tableName: "cliente",
            timestamps: false
        });

Cliente.hasMany(Pedido, { foreignKey: "id_cliente" });
Cliente.belongsToMany(Estabelecimento, {
  through: EntregadorEstabelecimento,
  foreignKey: "id_entregador",
  otherKey: "id_estabelecimento"
});
module.exports = Cliente;
