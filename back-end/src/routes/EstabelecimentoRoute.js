const express = require('express');
const router = express.Router();
const EstabelecimentoController = require('../controller/EstabelecimentoController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Rotas públicas
router.get('/', EstabelecimentoController.listar); // Listar restaurantes (público)
router.get('/:id', EstabelecimentoController.consultarPorID); // Ver restaurante específico (público)
router.post('/', EstabelecimentoController.criar); // Cadastro de restaurante

// Rotas protegidas
//router.use(AutenticacaoMiddleware.verificarToken);

router.put('/:id', EstabelecimentoController.atualizar);
router.delete('/:id', EstabelecimentoController.deletar);

module.exports = router;