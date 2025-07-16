const express = require('express');
const cors = require('cors');

// Teste básico sem banco de dados
const app = express();
const PORT = 3001; // Porta diferente para teste

app.use(cors());
app.use(express.json());

// Rota de teste básica
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Servidor de teste funcionando!',
        timestamp: new Date().toISOString()
    });
});

// Teste das rotas sem banco
app.get('/test-routes', (req, res) => {
    const routes = [
        'GET /auth/login',
        'GET /clientes',
        'POST /clientes',
        'GET /estabelecimentos',
        'POST /estabelecimentos',
        'GET /itens',
        'POST /itens',
        'GET /pedidos',
        'POST /pedidos'
    ];
    
    res.json({
        message: 'Rotas implementadas:',
        routes: routes,
        total: routes.length
    });
});

app.listen(PORT, () => {
    console.log(`🧪 Servidor de teste rodando na porta ${PORT}`);
    console.log(`📍 Teste: http://localhost:${PORT}/test`);
    console.log(`📍 Rotas: http://localhost:${PORT}/test-routes`);
});