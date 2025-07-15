const express = require('express');
const router = express.Router();
const PedidoController = require('../controller/PedidoController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Todas as rotas de pedido precisam de autenticação
router.use(AutenticacaoMiddleware.verificarToken);

router.get('/', PedidoController.listar);
router.get('/:id', PedidoController.consultarPorID);
router.post('/', PedidoController.criar);
router.put('/:id', PedidoController.atualizar);
router.delete('/:id', PedidoController.deletar);
router.patch('/:id/status', PedidoController.atualizarStatus);

module.exports = router;