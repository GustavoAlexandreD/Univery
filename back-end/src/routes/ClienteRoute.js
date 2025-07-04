const express = require('express');
const router = express.Router();
const ClienteController = require('../controller/ClienteController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Rotas públicas
router.post('/', ClienteController.criar); // Cadastro de cliente

// Rotas protegidas
router.use(AutenticacaoMiddleware.verificarToken); // Middleware para todas as rotas abaixo

router.get('/', ClienteController.listar);
router.get('/:id', ClienteController.consultarPorID);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.deletar);
router.patch('/:id/entregador', ClienteController.atualizarEntregador);

module.exports = router;