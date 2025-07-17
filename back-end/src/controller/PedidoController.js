const Pedido = require("../model/Pedido.js");
const ErrorServices = require("../services/ErrorServices.js");
const Cliente = require("../model/Cliente.js");
const Estabelecimento = require("../model/Estabelecimento.js");
const Item = require("../model/Item.js");
const ItemPedido = require("../model/ItemPedido.js");

const PedidoController = {

    listar: async (request, response) => {
        try {
            const pedidos = await Pedido.findAll({
                include: [
                    { model: Cliente, as: 'cliente' },
                    { model: Estabelecimento, as: 'estabelecimento' },
                    {
                        model: Item,
                        as: 'itens',
                        through: { attributes: ['quantidade'] }
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
                    { model: Cliente, as: 'cliente' },
                    { model: Estabelecimento, as: 'estabelecimento' },
                    {
                        model: Item,
                        as: 'itens',
                        through: { attributes: ['quantidade'] }
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
            const { status, id_cliente, id_estabelecimento, itens } = request.body;

            if (!itens || !Array.isArray(itens) || itens.length === 0) {
                return response.status(400).json({ erro: "É necessário fornecer uma lista de itens com quantidade." });
            }

            // Verifica se todos os itens existem
            const itemIds = itens.map(i => i.id_item);
            const itensExistentes = await Item.findAll({ where: { id: itemIds } });
            if (itensExistentes.length !== itens.length) {
                return response.status(400).json({ erro: "Um ou mais itens não encontrados." });
            }

            // Calcula o preço total (com base nos itens e suas quantidades)
            let total = 0;
            for (const item of itens) {
                const itemInfo = itensExistentes.find(i => i.id === item.id_item);
                total += itemInfo.preco * (item.quantidade || 1);
            }

            // Cria o pedido
            const novoPedido = await Pedido.create({
                status,
                id_cliente,
                id_estabelecimento,
                total
            });

            // Cria os relacionamentos em ItemPedido
            for (const item of itens) {
                await ItemPedido.create({
                    id_pedido: novoPedido.id,
                    id_item: item.id_item,
                    quantidade: item.quantidade || 1
                });
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