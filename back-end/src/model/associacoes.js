const Cliente = require('./Cliente');
const Estabelecimento = require('./Estabelecimento');
const EntregadorEstabelecimento = require('./EntregadorEstabelecimento');
const Pedido = require('./Pedido');
const Item = require('./Item');
const ItemPedido = require('./ItemPedido');

// ========== Cliente x Estabelecimento (entregadores vinculados) ==========
Cliente.belongsToMany(Estabelecimento, {
  through: EntregadorEstabelecimento,
  foreignKey: 'id_cliente',
  otherKey: 'id_estabelecimento',
  as: 'estabelecimentos_vinculados'
});

Estabelecimento.belongsToMany(Cliente, {
  through: EntregadorEstabelecimento,
  foreignKey: 'id_estabelecimento',
  otherKey: 'id_cliente',
  as: 'entregadores'
});

EntregadorEstabelecimento.belongsTo(Cliente, {
  foreignKey: 'id_cliente',
  as: 'cliente'
});
EntregadorEstabelecimento.belongsTo(Estabelecimento, {
  foreignKey: 'id_estabelecimento',
  as: 'estabelecimento'
});

// ========== Cliente → Pedido ==========
Cliente.hasMany(Pedido, { foreignKey: 'id_cliente', as: 'pedidos' });
Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

// ========== Estabelecimento → Pedido ==========
Estabelecimento.hasMany(Pedido, { foreignKey: 'id_estabelecimento', as: 'pedidos' });
Pedido.belongsTo(Estabelecimento, { foreignKey: 'id_estabelecimento', as: 'estabelecimento' });

// ========== Estabelecimento → Item ==========
Estabelecimento.hasMany(Item, { foreignKey: 'id_estabelecimento', as: 'itens' });
Item.belongsTo(Estabelecimento, { foreignKey: 'id_estabelecimento', as: 'estabelecimento' });

// ========== Pedido x Item via ItemPedido ==========
Pedido.belongsToMany(Item, {
  through: ItemPedido,
  foreignKey: 'id_pedido',
  otherKey: 'id_item',
  as: 'itens'
});

Item.belongsToMany(Pedido, {
  through: ItemPedido,
  foreignKey: 'id_item',
  otherKey: 'id_pedido',
  as: 'pedidos'
});

// Pedido tem muitos ItensPedido
Pedido.hasMany(ItemPedido, {
  foreignKey: 'id_pedido',
  as: 'itensPedido'
});

// ItemPedido pertence a Pedido
ItemPedido.belongsTo(Pedido, {
  foreignKey: 'id_pedido',
  as: 'pedido'
});

// Item tem muitos ItensPedido
Item.hasMany(ItemPedido, {
  foreignKey: 'id_item',
  as: 'itensPedido'
});

// ItemPedido pertence a Item
ItemPedido.belongsTo(Item, {
  foreignKey: 'id_item',
  as: 'item'
});
