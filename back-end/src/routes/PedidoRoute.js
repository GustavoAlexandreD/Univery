const express = require('express');
const router = express.Router();
const PedidoController = require('../controller/PedidoController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Todas as rotas de pedidos são protegidas
//router.use(AutenticacaoMiddleware.verificarToken);

// Rotas acessíveis por clientes e estabelecimentos
router.get('/', PedidoController.listar);
router.get('/:id', PedidoController.consultarPorID);

// Apenas clientes podem criar pedidos
router.post('/', AutenticacaoMiddleware.verificarTipoUsuario(['cliente']), PedidoController.criar);

// Clientes podem atualizar seus próprios pedidos, estabelecimentos podem atualizar status
router.put('/:id', PedidoController.atualizar);
router.delete('/:id', PedidoController.deletar);
router.patch('/:id/status', PedidoController.atualizarStatus);

module.exports = router;