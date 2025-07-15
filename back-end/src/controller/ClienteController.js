const Cliente = require("../model/Cliente");
const ErrorServices = require("../services/ErrorServices");
const ClientesServices = require("../services/ClientesServices");
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
            return ErrorServices.validacaoErro("Erro ao cadastrar cliente.", e, res);
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

        return res.json({
            message: "Cliente atualizado com sucesso!"
        });
    },

    deletar: async (request, response) => {
        const id = req.params.id;

        await Cliente.destroy({ where: { id } });

        return res.json({
            message: "Cliente deletado com sucesso!"
        });
    },

    atualizarEntregador: async (request, response) => {
        try {
            const id = req.params.id;
            const { entregador } = req.body;

            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ erro: 'Cliente não encontrado' });
            }

            cliente.entregador = entregador;
            await cliente.save();

            return res.json({
                message: "Status de entregador atualizado com sucesso!",
                data: cliente
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar entregador.", e, res);
        }
    }
};

module.exports = ClienteController;
