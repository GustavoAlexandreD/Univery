const express = require('express');
const router = express.Router();
const AutorizacaoController = require('../controller/AutorizacaoController');

// Rota de autenticação (pública)
router.post('/login', AutorizacaoController.login);

module.exports = router;