const Conexao = require('../config/conexao');

// Importar todos os modelos para garantir que as associações sejam criadas
const Cliente = require('../model/Cliente');
const Estabelecimento = require('../model/Estabelecimento');
const Item = require('../model/Item');
const Pedido = require('../model/Pedido');
const ItemPedido = require('../model/ItemPedido');
const EntregadorEstabelecimento = require('../model/EntregadorEstabelecimento');

// Definir associações após importar todos os modelos
const definirAssociacoes = () => {
    // Cliente - Pedido
    Cliente.hasMany(Pedido, { foreignKey: "id_cliente" });
    Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" });

    // Estabelecimento - Pedido
    Estabelecimento.hasMany(Pedido, { foreignKey: "id_estabelecimento" });
    Pedido.belongsTo(Estabelecimento, { foreignKey: "id_estabelecimento" });

    // Estabelecimento - Item
    Estabelecimento.hasMany(Item, { foreignKey: "id_estabelecimento" });
    Item.belongsTo(Estabelecimento, { foreignKey: "id_estabelecimento" });

    // Item - Pedido (Many-to-Many através de ItemPedido)
    Item.belongsToMany(Pedido, {
        through: ItemPedido,
        foreignKey: "id_item",
        otherKey: "id_pedido"
    });
    Pedido.belongsToMany(Item, {
        through: ItemPedido,
        foreignKey: "id_pedido",
        otherKey: "id_item"
    });

    // ItemPedido - Item e Pedido
    ItemPedido.belongsTo(Item, { foreignKey: "id_item" });
    ItemPedido.belongsTo(Pedido, { foreignKey: "id_pedido" });
    Item.hasMany(ItemPedido, { foreignKey: "id_item" });
    Pedido.hasMany(ItemPedido, { foreignKey: "id_pedido" });

    // Cliente (Entregador) - Estabelecimento (Many-to-Many através de EntregadorEstabelecimento)
    Cliente.belongsToMany(Estabelecimento, {
        through: EntregadorEstabelecimento,
        foreignKey: "id_entregador",
        otherKey: "id_estabelecimento"
    });
    Estabelecimento.belongsToMany(Cliente, {
        through: EntregadorEstabelecimento,
        foreignKey: "id_estabelecimento",
        otherKey: "id_entregador"
    });

    // EntregadorEstabelecimento - Cliente e Estabelecimento
    EntregadorEstabelecimento.belongsTo(Cliente, { foreignKey: "id_entregador" });
    EntregadorEstabelecimento.belongsTo(Estabelecimento, { foreignKey: "id_estabelecimento" });
    Cliente.hasMany(EntregadorEstabelecimento, { foreignKey: "id_entregador" });
    Estabelecimento.hasMany(EntregadorEstabelecimento, { foreignKey: "id_estabelecimento" });
};

const Migration = {
    // Criar todas as tabelas
    criarTabelas: async () => {
        try {
            console.log('🔄 Iniciando criação das tabelas...');
            
            // Definir associações antes de sincronizar
            definirAssociacoes();
            
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
            
            // Definir associações antes de resetar
            definirAssociacoes();
            
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
                    senha: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', // Hash SHA256 de "hello"
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
                    senha: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
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
            definirAssociacoes();
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