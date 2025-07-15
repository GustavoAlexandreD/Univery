const Estabelecimento = require("../model/Estabelecimento");
const ErrorServices = require("../services/ErrorServices.js");
const RestaurantesServices = require("../services/RestaurantesServices");
const Helpers = require('../config/Helpers.js');

const RestauranteController = {

    listar: async (request, response) => {
        const dados = await Estabelecimento.findAll();
        return response.json(dados);
    },

    consultarPorID: async (request, response) => {
        const id = request.params.id;
        const dados = await Estabelecimento.findByPk(id);
        return response.json(dados);
    },

    criar: async (request, response) => {
        try {
            const dados = request.body;
            dados.senha = Helpers.crypto(dados.senha);

            await RestaurantesServices.validandoRestaurante(dados);
            await Estabelecimento.create(dados);

            return response.json({
                message: "Restaurante criado com sucesso!",
                data: dados
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao cadastrar restaurante.", e, response);
        }
    },

    atualizar: async (request, response) => {
        const id = request.params.id;
        const dados = request.body;

        if (dados.senha) {
            dados.senha = Helpers.crypto(dados.senha);
        }

        await Estabelecimento.update(dados, {
            where: { id }
        });

        return response.json({
            message: "Restaurante atualizado com sucesso!"
        });
    },

    deletar: async (request, response) => {
        const id = request.params.id;

        await Estabelecimento.destroy({
            where: { id }
        });

        return response.json({
            message: "Restaurante deletado com sucesso!"
        });
    },

    atualizarStatus: async (request, response) => {
        try {
            const id = request.params.id;
            const { ativo } = request.body;

            const restaurante = await Estabelecimento.findByPk(id);
            if (!restaurante) {
                return response.status(404).json({ erro: 'Restaurante não encontrado' });
            }

            restaurante.ativo = ativo;
            await restaurante.save();

            return response.json({
                message: "Status de funcionamento atualizado com sucesso!",
                data: restaurante
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar status do restaurante.", e, response);
        }
    }

};

module.exports = RestauranteController;
