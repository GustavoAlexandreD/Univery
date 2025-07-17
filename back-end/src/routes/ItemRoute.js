const express = require('express');
const router = express.Router();
const ItemController = require('../controller/ItemController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Rotas públicas
router.get('/', ItemController.listar); // Listar itens (público)
router.get('/:id', ItemController.consultarPorID); // Ver item específico (público)

// Rotas protegidas
//router.use(AutenticacaoMiddleware.verificarToken);

// Apenas estabelecimentos podem criar/editar/deletar itens
router.post('/', AutenticacaoMiddleware.verificarTipoUsuario(['estabelecimento']), ItemController.criar);
router.put('/:id', AutenticacaoMiddleware.verificarTipoUsuario(['estabelecimento']), ItemController.atualizar);
router.delete('/:id', AutenticacaoMiddleware.verificarTipoUsuario(['estabelecimento']), ItemController.deletar);
router.patch('/:id/preco', AutenticacaoMiddleware.verificarTipoUsuario(['estabelecimento']), ItemController.atualizarPreco);

module.exports = router;