// Teste de conexão com banco de dados
require('dotenv').config();

async function testarConexao() {
    try {
        console.log('🔄 Testando conexão com banco de dados...');
        
        // Verificar variáveis de ambiente
        console.log('📋 Variáveis de ambiente:');
        console.log('- DIALECT:', process.env.DIALECT || 'NÃO DEFINIDO');
        console.log('- HOST_DB:', process.env.HOST_DB || 'NÃO DEFINIDO');
        console.log('- PORT_DB:', process.env.PORT_DB || 'NÃO DEFINIDO');
        console.log('- USERNAME_DB:', process.env.USERNAME_DB || 'NÃO DEFINIDO');
        console.log('- DATABASE_DB:', process.env.DATABASE_DB || 'NÃO DEFINIDO');
        
        // Tentar importar conexão
        const Conexao = require('./src/config/conexao');
        console.log('✅ Arquivo de conexão importado com sucesso');
        
        // Tentar autenticar
        await Conexao.authenticate();
        console.log('✅ Conexão com banco de dados estabelecida!');
        
        // Testar sincronização (sem force)
        await Conexao.sync({ alter: false });
        console.log('✅ Sincronização de modelos OK!');
        
        // Fechar conexão
        await Conexao.close();
        console.log('✅ Conexão fechada com sucesso');
        
    } catch (error) {
        console.log('❌ Erro na conexão:', error.message);
        console.log('💡 Verifique se:');
        console.log('   - PostgreSQL está rodando');
        console.log('   - Arquivo .env está configurado corretamente');
        console.log('   - Banco de dados existe');
        console.log('   - Credenciais estão corretas');
    }
}

testarConexao();