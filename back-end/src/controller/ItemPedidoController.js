const ItemPedido = require("../model/ItemPedido.js");
const ErrorServices = require("../services/ErrorServices.js");
const Item = require("../model/Item.js");
const Pedido = require("../model/Pedido.js");

const ItemPedidoController = {

    listar: async (request, response) => {
        try {
            const dados = await ItemPedido.findAll({
                include: [
                    { model: Pedido, as: 'pedido' },
                    { model: Item, as: 'item' }
                ]
            });

            return response.json(dados);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao listar itens do pedido.", e, response);
        }
    },

    consultarPorPedido: async (request, response) => {
        try {
            const id_pedido = request.params.id;

            const itens = await ItemPedido.findAll({
                where: { id_pedido },
                include: [{ model: Item, as: 'item' }]
            });

            return response.json(itens);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao consultar itens do pedido.", e, response);
        }
    },

    criar: async (request, response) => {
        try {
            const { id_pedido, id_item, quantidade } = request.body;

            await ItemPedido.create({ id_pedido, id_item, quantidade });

            return response.json({
                message: "Item adicionado ao pedido com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao adicionar item ao pedido.", e, response);
        }
    },

    atualizarQuantidade: async (request, response) => {
        try {
            const { id_pedido, id_item } = request.params;
            const { quantidade } = request.body;

            const atualizado = await ItemPedido.update(
                { quantidade },
                { where: { id_pedido, id_item } }
            );

            return response.json({
                message: "Quantidade atualizada com sucesso!",
                atualizado
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar quantidade.", e, response);
        }
    },

    deletar: async (request, response) => {
        try {
            const { id_pedido, id_item } = request.params;

            await ItemPedido.destroy({
                where: { id_pedido, id_item }
            });

            return response.json({
                message: "Item removido do pedido com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao remover item do pedido.", e, response);
        }
    }

};

module.exports = ItemPedidoController;
