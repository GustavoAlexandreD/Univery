const Pedido = require("../model/Pedido.js");
const ErrorServices = require("../services/ErrorServices.js");
const Cliente = require("../model/EntregadorCliente.js");
const Estabelecimento = require("../model/Estabelecimento.js");
const Item = require("../model/Item.js");
const ItemPedido = require("../model/ItemPedido.js");

const PedidoController = {

    listar: async (request, response) => {
        try {
            const pedidos = await Pedido.findAll({
                include: [
                    { model: Cliente },
                    { model: Estabelecimento },
                    {
                        model: Item,
                        through: { attributes: [] }
                    }
                ]
            });
            return response.json(pedidos);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao listar pedidos.", e, response);
        }
    },

    consultarPorID: async (request, response) => {
        try {
            const id = request.params.id;
            const pedido = await Pedido.findByPk(id, {
                include: [
                    { model: Cliente },
                    { model: Estabelecimento },
                    {
                        model: Item,
                        through: { attributes: [] }
                    }
                ]
            });

            if (!pedido) {
                return response.status(404).json({ erro: "Pedido não encontrado" });
            }

            return response.json(pedido);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao consultar pedido.", e, response);
        }
    },

    criar: async (request, response) => {
        try {
            const dados = request.body;

            const novoPedido = await Pedido.create({
                status: dados.status,
                id_cliente: dados.id_cliente,
                id_estabelecimento: dados.id_estabelecimento
            });

            if (dados.itens && Array.isArray(dados.itens)) {
                for (const id_item of dados.itens) {
                    await ItemPedido.create({
                        id_pedido: novoPedido.id,
                        id_item: id_item
                    });
                }
            }

            return response.json({
                message: "Pedido criado com sucesso!",
                data: novoPedido
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao cadastrar pedido.", e, response);
        }
    },

    atualizar: async (request, response) => {
        try {
            const id = request.params.id;
            const dados = request.body;

            await Pedido.update(dados, {
                where: { id }
            });

            return response.json({
                message: "Pedido atualizado com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar pedido.", e, response);
        }
    },

    deletar: async (request, response) => {
        try {
            const id = request.params.id;

            await ItemPedido.destroy({ where: { id_pedido: id } });
            await Pedido.destroy({ where: { id } });

            return response.json({
                message: "Pedido deletado com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao deletar pedido.", e, response);
        }
    },

    atualizarStatus: async (request, response) => {
        try {
            const id = request.params.id;
            const { status } = request.body;

            const pedido = await Pedido.findByPk(id);
            if (!pedido) {
                return response.status(404).json({ erro: "Pedido não encontrado" });
            }

            pedido.status = status;
            await pedido.save();

            return response.json({
                message: "Status do pedido atualizado com sucesso!",
                data: pedido
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar status do pedido.", e, response);
        }
    }

};

module.exports = PedidoController;
