const express = require('express');
const router = express.Router();
const ItemPedidoController = require('../controller/ItemPedidoController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Todas as rotas precisam de autenticação
router.use(AutenticacaoMiddleware.verificarToken);

router.get('/', ItemPedidoController.listar);
router.get('/pedido/:id', ItemPedidoController.consultarPorPedido);
router.post('/', ItemPedidoController.criar);
router.put('/:id_pedido/:id_item', ItemPedidoController.atualizarQuantidade);
router.delete('/:id_pedido/:id_item', ItemPedidoController.deletar);

module.exports = router;