const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexão com banco
const Conexao = require('./config/conexao');

// Importar controllers
const ClienteController = require('./controller/ClienteController');
const Estabelecimento = require('./controller/EstabelecimentoController');
const AutorizacaoController = require('./controller/AutorizacaoController');

// Importar middleware de autenticação (quando implementado)
// const AutenticacaoMiddleware = require('./middleware/AutenticacaoMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de log das requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rota de teste
app.get('/', (req, res) => {
    res.json({ 
        message: 'API UNIVERY funcionando!',
        timestamp: new Date().toISOString()
    });
});

// ==================== ROTAS DE AUTENTICAÇÃO ====================
app.post('/auth/login', AutorizacaoController.login);

// ==================== ROTAS DE CLIENTES ====================
app.get('/clientes', ClienteController.listar);
app.get('/clientes/:id', ClienteController.consultarPorID);
app.post('/clientes', ClienteController.criar);
app.put('/clientes/:id', ClienteController.atualizar);
app.delete('/clientes/:id', ClienteController.deletar);
app.patch('/clientes/:id/entregador', ClienteController.atualizarEntregador);

// ==================== ROTAS DE RESTAURANTES ====================
app.get('/estabelecimentos', Estabelecimento.listar);
app.get('/estabelecimentos/:id', Estabelecimento.consultarPorID);
app.post('/estabelecimentos', Estabelecimento.criar);
app.put('/estabelecimentos/:id', Estabelecimento.atualizar);
app.delete('/estabelecimentos/:id', Estabelecimento.deletar);
app.patch('/estabelecimentos/:id/status', Estabelecimento.atualizarStatus);

// ==================== MIDDLEWARE DE ERRO ====================
app.use((err, req, res, next) => {
    console.error('Erro capturado:', err);
    res.status(500).json({
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
});

// ==================== ROTA 404 ====================
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada',
        path: req.originalUrl
    });
});

// ==================== INICIALIZAÇÃO DO SERVIDOR ====================
const iniciarServidor = async () => {
    try {
        // Testar conexão com banco de dados
        await Conexao.authenticate();
        console.log('✅ Conexão com banco de dados estabelecida com sucesso!');
        
        // Sincronizar modelos (opcional - cuidado em produção)
        if (process.env.NODE_ENV === 'development') {
            await Conexao.sync({ alter: false });
            console.log('✅ Modelos sincronizados com o banco de dados!');
        }
        
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📍 URL: http://localhost:${PORT}`);
            console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
        });
        
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

// Iniciar servidor
iniciarServidor();

module.exports = app;