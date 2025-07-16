const Cliente = require('./Cliente');
const Estabelecimento = require('./Estabelecimento');
const EntregadorEstabelecimento = require('./EntregadorEstabelecimento');

// N:N entre Cliente (entregador) e Estabelecimento
Estabelecimento.belongsToMany(Cliente, {
  through: EntregadorEstabelecimento,
  foreignKey: 'id_estabelecimento',
  otherKey: 'id_entregador',
  as: 'entregadores' // alias para indicar que são entregadores
});

Cliente.belongsToMany(Estabelecimento, {
  through: EntregadorEstabelecimento,
  foreignKey: 'id_entregador',
  otherKey: 'id_estabelecimento',
  as: 'entregadores_estabelecimentos' // alias útil caso precise buscar os estabelecimentos vinculados
});
