const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./model/associacoes');

// Importar conexão com banco
const Conexao = require('./config/conexao');

// Importar rotas
const ClienteRoute = require('./routes/ClienteRoute');
const EstabelecimentoRoute = require('./routes/EstabelecimentoRoute');
const ItemRoute = require('./routes/ItemRoute');
const PedidoRoute = require('./routes/PedidoRoute');
const ItemPedidoRoute = require('./routes/ItemPedidoRoute');
const EntregadorEstabRoute = require('./routes/EntregadorEstabRoute');
const AutorizacaoRoute = require('./routes/AutorizacaoRoute');

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
app.use('/auth', AutorizacaoRoute);

// ==================== ROTAS PRINCIPAIS ====================
app.use('/clientes', ClienteRoute);
app.use('/estabelecimentos', EstabelecimentoRoute);
app.use('/itens', ItemRoute);
app.use('/pedidos', PedidoRoute);
app.use('/item-pedido', ItemPedidoRoute);
app.use('/entregador-estabelecimento', EntregadorEstabRoute);

// ==================== MIDDLEWARE DE ERRO ====================
app.use((err, req, res, next) => {
    console.error('Erro capturado:', err);
    res.status(500).json({
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
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