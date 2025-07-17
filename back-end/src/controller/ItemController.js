const Item = require("../model/Item.js");
const ErrorServices = require("../services/ErrorServices.js");
const Estabelecimento = require("../model/Estabelecimento.js");
const Pedido = require("../model/Pedido.js");
const ItemPedido = require("../model/ItemPedido.js");

const ItemController = {

    listar: async (request, response) => {
        try {
            const itens = await Item.findAll({
                include: [
                    { model: Estabelecimento, as: 'estabelecimento' },
                    {
                        model: Pedido,
                        as: 'pedidos',
                        through: { attributes: [] }
                    }
                ]
            });

            return response.json(itens);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao listar itens.", e, response);
        }
    },

    consultarPorID: async (request, response) => {
        try {
            const id = request.params.id;

            const item = await Item.findByPk(id, {
                include: [
                    { model: Estabelecimento, as: 'estabelecimento' },
                    {
                        model: Pedido,
                        as: 'pedidos',
                        through: { attributes: [] }
                    }
                ]
            });

            if (!item) {
                return response.status(404).json({ erro: "Item não encontrado" });
            }

            return response.json(item);
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao consultar item.", e, response);
        }
    },

    criar: async (request, response) => {
        try {
            const { nome, descricao, preco, id_estabelecimento} = request.body;

            if (!nome || !preco || !id_estabelecimento) {
                return response.status(400).json({ erro: "Campos obrigatórios: nome, preco, id_estabelecimento" });
            }

            const novoItem = await Item.create({
                nome,
                descricao,
                preco,
                id_estabelecimento
            });

            return response.json({
                message: "Item criado com sucesso!",
                data: novoItem
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao criar item.", e, response);
        }
    },

    atualizar: async (request, response) => {
        try {
            const id = request.params.id;
            const { nome, descricao, preco, id_estabelecimento} = request.body;

            const item = await Item.findByPk(id);
            if (!item) {
                return response.status(404).json({ erro: "Item não encontrado" });
            }

            item.nome = nome ?? item.nome;
            item.descricao = descricao ?? item.descricao;
            item.preco = preco ?? item.preco;
            item.id_estabelecimento = id_estabelecimento ?? item.id_estabelecimento;

            await item.save();

            return response.json({
                message: "Item atualizado com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar item.", e, response);
        }
    },

    deletar: async (request, response) => {
        try {
            const id = request.params.id;

            await ItemPedido.destroy({ where: { id_item: id } });
            await Item.destroy({ where: { id } });

            return response.json({
                message: "Item deletado com sucesso!"
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao deletar item.", e, response);
        }
    },

    atualizarPreco: async (request, response) => {
        try {
            const id = request.params.id;
            const { preco } = request.body;

            const item = await Item.findByPk(id);
            if (!item) {
                return response.status(404).json({ erro: "Item não encontrado" });
            }

            item.preco = preco;
            await item.save();

            return response.json({
                message: "Preço atualizado com sucesso!",
                data: item
            });
        } catch (e) {
            return ErrorServices.validacaoErro("Erro ao atualizar preço.", e, response);
        }
    }
};

module.exports = ItemController;
