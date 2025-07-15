const express = require('express');
const router = express.Router();
const EntregadorEstabController = require('../controller/EntregadorEstabController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Todas as rotas precisam de autenticação
router.use(AutenticacaoMiddleware.verificarToken);

router.get('/', EntregadorEstabController.listar);
router.get('/entregador/:id', EntregadorEstabController.consultarPorEntregador);
router.post('/', EntregadorEstabController.criar);
router.put('/:id_entregador/:id_estabelecimento', EntregadorEstabController.atualizarDisponibilidade);
router.delete('/:id_entregador/:id_estabelecimento', EntregadorEstabController.deletar);

module.exports = router;