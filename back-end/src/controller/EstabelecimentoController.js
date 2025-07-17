const Estabelecimento = require("../model/Estabelecimento.js");
const ErrorServices = require("../services/ErrorServices.js");
const EstabelecimentoServices = require("../services/EstabelecimentoServices.js");
const Helpers = require('../config/Helpers.js');

const EstabelecimentoController = {

    listar: async (request, response) => {
        try {
            const dados = await Estabelecimento.findAll({
                attributes: ['id', 'nome', 'telefone', 'email']
            });
            return response.json(dados);
        } catch (error) {
            console.error('Erro ao listar estabelecimentos:', error);
            return response.status(500).json({
                message: 'Erro interno do servidor ao buscar estabelecimentos'
            });
        }
    },

    consultarPorID: async (request, response) => {
        try {
            const id = request.params.id;
            const dados = await Estabelecimento.findByPk(id, {
                attributes: ['id', 'nome', 'telefone', 'email']
            });
            
            if (!dados) {
                return response.status(404).json({
                    message: 'Estabelecimento não encontrado'
                });
            }
            
            return response.json(dados);
        } catch (error) {
            console.error('Erro ao consultar estabelecimento:', error);
            return response.status(500).json({
                message: 'Erro interno do servidor ao buscar estabelecimento'
            });
        }
    },

    criar: async (request, response) => {
        try {
            const dados = request.body;
            dados.senha = Helpers.crypto(dados.senha);

            await EstabelecimentoServices.validandoEstabelecimento(dados);
            await Estabelecimento.create(dados);

            return response.json({
                message: "Estabelecimento criado com sucesso!",
                data: dados
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao cadastrar Estabelecimento.", e, response);
        }
    },

    atualizar: async (request, response) => {
        try {
            const id = request.params.id;
            const dados = request.body;

            if (dados.senha) {
                dados.senha = Helpers.crypto(dados.senha);
            }

            await Estabelecimento.update(dados, {
                where: { id }
            });

            return response.json({
                message: "Estabelecimento atualizado com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar Estabelecimento.", e, response);
        }
    },

    deletar: async (request, response) => {
        try {
            const id = request.params.id;

            await Estabelecimento.destroy({
                where: { id }
            });

            return response.json({
                message: "Estabelecimento deletado com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao deletar Estabelecimento.", e, response);
        }
    }

    // Removido atualizarStatus por não existir campo "ativo"
};

module.exports = EstabelecimentoController;
