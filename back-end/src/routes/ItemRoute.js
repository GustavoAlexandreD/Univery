const express = require('express');
const router = express.Router();
const ItemController = require('../controller/ItemController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Rotas públicas
router.get('/', ItemController.listar); // Listar itens (público)
router.get('/:id', ItemController.consultarPorID); // Ver item específico (público)

// Rotas protegidas
router.use(AutenticacaoMiddleware.verificarToken);

router.post('/', ItemController.criar);
router.put('/:id', ItemController.atualizar);
router.delete('/:id', ItemController.deletar);
router.patch('/:id/preco', ItemController.atualizarPreco);

module.exports = router;