const EntregadorEstabelecimentoModel = require("../model/EntregadorEstabelecimento.js");
const ErrorServices = require("../services/ErrorServices.js");
const Cliente = require("../model/Cliente.js");
const Estabelecimento = require("../model/Estabelecimento.js");

const EntregadorEstabelecimentoController = {

    listar: async (request, response) => {
        try {
            const dados = await EntregadorEstabelecimentoModel.findAll({
                include: [
                    { model: Cliente },
                    { model: Estabelecimento }
                ]
            });

            return response.json(dados);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao listar relações entregador-estabelecimento.", e, response);
        }
    },

    consultarPorEntregador: async (request, response) => {
        try {
            const id_entregador = request.params.id;

            const dados = await EntregadorEstabelecimentoModel.findAll({
                where: { id_entregador },
                include: [{ model: Estabelecimento }]
            });

            return response.json(dados);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao consultar estabelecimentos do entregador.", e, response);
        }
    },

    criar: async (request, response) => {
        try {
            const { id_entregador, id_estabelecimento, disponivel } = request.body;

            await EntregadorEstabelecimentoModel.create({
                id_entregador,
                id_estabelecimento,
                disponivel
            });

            return response.json({
                message: "Relação entre entregador e estabelecimento criada com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao criar relação entregador-estabelecimento.", e, response);
        }
    },

    atualizarDisponibilidade: async (request, response) => {
        try {
            const { id_entregador, id_estabelecimento } = request.params;
            const { disponivel } = request.body;

            await EntregadorEstabelecimentoModel.update(
                { disponivel },
                { where: { id_entregador, id_estabelecimento } }
            );

            return response.json({
                message: "Disponibilidade atualizada com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar disponibilidade.", e, response);
        }
    },

    deletar: async (request, response) => {
        try {
            const { id_entregador, id_estabelecimento } = request.params;

            await EntregadorEstabelecimentoModel.destroy({
                where: { id_entregador, id_estabelecimento }
            });

            return response.json({
                message: "Associação entre entregador e estabelecimento removida com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao remover associação.", e, response);
        }
    }

};

module.exports = EntregadorEstabelecimentoController;
