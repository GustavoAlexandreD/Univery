const Cliente = require("../model/Cliente");
const ErrorServices = require("../services/ErrorServices");
const ClientesServices = require("../services/ClienteServices");
const Helpers = require('../config/Helpers.js');

const ClienteController = {
    listar: async (request, response) => {
        const dados = await Cliente.findAll();
        return response.json(dados);
    },

    consultarPorID: async (request, response) => {
        const id = request.params.id;
        const dados = await Cliente.findByPk(id);
        return response.json(dados);
    },

    consultarPorTipo: async (request, response) => {
        const tipo = request.params.tipo;
        const dados = await Cliente.findAll({ where: { tipo } });
        return response.json(dados);
    },

    criar: async (request, response) => {
        try {
            const dados = request.body;
            dados.senha = Helpers.crypto(dados.senha);

            await ClientesServices.validandoCliente(dados);
            await Cliente.create(dados);

            return response.json({
                message: "Cliente criado com sucesso!",
                data: dados
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao cadastrar cliente.", e, response);
        }
    },

    atualizar: async (request, response) => {
        const id = request.params.id;
        const dados = request.body;

        if (dados.senha) {
            dados.senha = Helpers.crypto(dados.senha);
        }

        await Cliente.update(dados, {
            where: { id }
        });

        return response.json({
            message: "Cliente atualizado com sucesso!"
        });
    },

    deletar: async (request, response) => {
        const id = request.params.id;

        await Cliente.destroy({ where: { id } });

        return response.json({
            message: "Cliente deletado com sucesso!"
        });
    },

    atualizarEntregador: async (request, response) => {
        try {
            const id = request.params.id;
            const { tipo } = request.body; // tipo deve ser "Entregador" ou "Cliente"

            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return response.status(404).json({ erro: 'Cliente não encontrado' });
            }

            cliente.tipo = tipo;
            await cliente.save();

            return response.json({
                message: "Tipo de cliente atualizado com sucesso!",
                data: cliente
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar tipo de cliente.", e, response);
        }
    }
};

module.exports = ClienteController;
