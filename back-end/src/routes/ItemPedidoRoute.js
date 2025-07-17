const express = require('express');
const router = express.Router();
const ItemPedidoController = require('../controller/ItemPedidoController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Todas as rotas são protegidas
//router.use(AutenticacaoMiddleware.verificarToken);

// Listar todos os itens de pedidos (admin/estabelecimento)
router.get('/', ItemPedidoController.listar);

// Consultar itens de um pedido específico
router.get('/pedido/:id', ItemPedidoController.consultarPorPedido);

// Gerenciar itens do pedido (apenas clientes)
router.post('/', AutenticacaoMiddleware.verificarTipoUsuario(['cliente']), ItemPedidoController.criar);
router.put('/pedido/:id_pedido/item/:id_item', AutenticacaoMiddleware.verificarTipoUsuario(['cliente']), ItemPedidoController.atualizarQuantidade);
router.delete('/pedido/:id_pedido/item/:id_item', AutenticacaoMiddleware.verificarTipoUsuario(['cliente']), ItemPedidoController.deletar);

module.exports = router;