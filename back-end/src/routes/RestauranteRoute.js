const express = require('express');
const router = express.Router();
const RestauranteController = require('../controller/RestauranteController');
const AutenticacaoMiddleware = require('../middleware/AutenticacaoMiddleware');

// Rotas públicas
router.get('/', RestauranteController.listar); // Listar restaurantes (público)
router.get('/:id', RestauranteController.consultarPorID); // Ver restaurante específico (público)
router.post('/', RestauranteController.criar); // Cadastro de restaurante

// Rotas protegidas
router.use(AutenticacaoMiddleware.verificarToken);

router.put('/:id', RestauranteController.atualizar);
router.delete('/:id', RestauranteController.deletar);
router.patch('/:id/status', RestauranteController.atualizarStatus);

module.exports = router;