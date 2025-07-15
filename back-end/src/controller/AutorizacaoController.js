const jwt = require("jsonwebtoken");
const Cliente = require("../model/Cliente");
const Estabelecimento = require("../model/Estabelecimento");
const Helpers = require('../config/Helpers.js');
require('dotenv').config();

const AutorizacaoController = {
    login: async (request, response) => {
        const { email, senha, tipo } = request.body;

        if (!tipo || !["cliente", "estabelecimento"].includes(tipo)) {
            return response.status(400).json({
                message: "Tipo de usuário inválido. Use 'cliente' ou 'estabelecimento'."
            });
        }

        const senhaCriptografada = Helpers.crypto(senha);
        let usuario = null;
// tipo deve ser enviado no body da requisição com valores "cliente" ou "estabelecimento".
        try {
            if (tipo === "cliente") {
                usuario = await Cliente.findOne({ where: { email, senha: senhaCriptografada } });
            } else if (tipo === "estabelecimento") {
                usuario = await Estabelecimento.findOne({ where: { email, senha: senhaCriptografada } });
            }

            if (!usuario) {
                return response.status(401).json({
                    message: "Email ou senha incorretos."
                });
            }

            const dados = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo
            };

            const token = jwt.sign(dados, process.env.TOKEN, { expiresIn: '7d' });

            return response.json({
                token,
                message: "Usuário logado com sucesso!",
                tipo
            });

        } catch (error) {
            console.error("Erro no login:", error);
            return response.status(500).json({
                message: "Erro interno ao realizar login."
            });
        }
    }
};

module.exports = AutorizacaoController;
