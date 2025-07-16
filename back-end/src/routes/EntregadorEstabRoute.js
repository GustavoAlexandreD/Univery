const express = require('express');
const router = express.Router();
const EntregadorEstabController = require('../controller/EntregadorEstabController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Todas as rotas são protegidas
router.use(AutenticacaoMiddleware.verificarToken);

// Listar todas as relações (admin)
router.get('/', EntregadorEstabController.listar);

// Consultar estabelecimentos de um entregador
router.get('/entregador/:id', EntregadorEstabController.consultarPorEntregador);

// Criar nova associação entregador-estabelecimento
router.post('/', EntregadorEstabController.criar);

// Atualizar disponibilidade do entregador para um estabelecimento
router.patch('/entregador/:id_entregador/estabelecimento/:id_estabelecimento', EntregadorEstabController.atualizarDisponibilidade);

// Remover associação
router.delete('/entregador/:id_entregador/estabelecimento/:id_estabelecimento', EntregadorEstabController.deletar);

module.exports = router;