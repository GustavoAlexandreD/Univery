const DataTypes = require('sequelize');
const Conexao = require('../config/conexao.js');
const EntregadorEstabelecimento = require("../model/EntregadorEstabelecimento.js")
const Pedido = require("../model/Pedido.js")
const Item = require("../model/Item.js")
const Entregador = require("../model/Entregador.js")

const Estabelecimento = Conexao.define("Estabelecimento", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    cnpj: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    telefone: { 
        type: DataTypes.STRING 
    },
    email: { 
        type: DataTypes.STRING
    },
    senha: { 
        type: DataTypes.STRING 
    }
}, 
{
  tableName: "estabelecimento",
  timestamps: false
});

Estabelecimento.hasMany(Pedido, { foreignKey: "id_estabelecimento" });
Estabelecimento.hasMany(Item, { foreignKey: "id_estabelecimento" });

Estabelecimento.belongsToMany(Entregador, {
  through: EntregadorEstabelecimento,
  foreignKey: "id_estabelecimento",
  otherKey: "id_entregador"
});
module.exports = Estabelecimento;
