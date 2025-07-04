const Conexao = require('../config/conexao');

// Importar todos os modelos para garantir que as associações sejam criadas
const Cliente = require('../model/Cliente');
const Estabelecimento = require('../model/Estabelecimento');
const Item = require('../model/Item');
const Pedido = require('../model/Pedido');
const ItemPedido = require('../model/ItemPedido');
const EntregadorEstabelecimento = require('../model/EntregadorEstabelecimento');

const Migration = {
    // Criar todas as tabelas
    criarTabelas: async () => {
        try {
            console.log('🔄 Iniciando criação das tabelas...');
            
            // Sincronizar modelos com o banco (force: true apaga e recria as tabelas)
            await Conexao.sync({ force: false, alter: true });
            
            console.log('✅ Todas as tabelas foram criadas/atualizadas com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao criar tabelas:', error);
            throw error;
        }
    },

    // Resetar banco de dados (CUIDADO: apaga todos os dados)
    resetarBanco: async () => {
        try {
            console.log('⚠️  ATENÇÃO: Resetando banco de dados...');
            
            await Conexao.sync({ force: true });
            
            console.log('✅ Banco de dados resetado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao resetar banco:', error);
            throw error;
        }
    },

    // Verificar conexão
    verificarConexao: async () => {
        try {
            await Conexao.authenticate();
            console.log('✅ Conexão com banco de dados OK!');
            return true;
        } catch (error) {
            console.error('❌ Erro de conexão com banco:', error);
            return false;
        }
    },

    // Inserir dados de exemplo (opcional)
    inserirDadosExemplo: async () => {
        try {
            console.log('🔄 Inserindo dados de exemplo...');
            
            // Exemplo de cliente
            await Cliente.findOrCreate({
                where: { email: 'cliente@aluno.uece.br' },
                defaults: {
                    nome: 'Cliente Exemplo',
                    email: 'cliente@aluno.uece.br',
                    senha: 'senhaHasheada', // Lembre-se de usar hash real
                    telefone: '85999999999',
                    tipo: 'cliente'
                }
            });

            // Exemplo de estabelecimento
            await Estabelecimento.findOrCreate({
                where: { cnpj: '12345678901234' },
                defaults: {
                    nome: 'Lanchonete do Campus',
                    cnpj: '12345678901234',
                    telefone: '85888888888',
                    email: 'lanchonete@campus.edu.br',
                    senha: 'senhaHasheada'
                }
            });

            console.log('✅ Dados de exemplo inseridos!');
        } catch (error) {
            console.error('❌ Erro ao inserir dados de exemplo:', error);
        }
    }
};

// Se este arquivo for executado diretamente
if (require.main === module) {
    const executarMigration = async () => {
        try {
            await Migration.verificarConexao();
            await Migration.criarTabelas();
            await Migration.inserirDadosExemplo();
            
            console.log('🎉 Migration concluída com sucesso!');
            process.exit(0);
        } catch (error) {
            console.error('💥 Falha na migration:', error);
            process.exit(1);
        }
    };

    executarMigration();
}

module.exports = Migration;