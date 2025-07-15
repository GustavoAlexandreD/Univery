const jwt = require("jsonwebtoken");
const Cliente = require("../model/Cliente");
const Estabelecimento = require("../model/Estabelecimento");
require('dotenv').config()
const Helpers = require('../config/Helpers.js');

const AutorizacaoController = {
    login: async (request, response) => {
        try {
            const { email, senha } = request.body;
            const senhaHash = Helpers.crypto(senha);

            // Tentar encontrar como cliente primeiro
            let usuario = await Cliente.findOne({
                where: {
                    email: email,
                    senha: senhaHash
                }
            });

            let tipoUsuario = 'cliente';

            // Se não encontrou como cliente, tentar como estabelecimento
            if (!usuario) {
                usuario = await Estabelecimento.findOne({
                    where: {
                        email: email,
                        senha: senhaHash
                    }
                });
                tipoUsuario = 'estabelecimento';
            }

            if (usuario) {
                const dados = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo: tipoUsuario
                };
                
                const token = jwt.sign(dados, process.env.TOKEN, { expiresIn: '24h' });
                
                return response.json({
                    token: token,
                    usuario: dados,
                    message: 'Usuário logado com sucesso!'
                });
            } else {
                return response.status(401).json({
                    message: 'Email ou senha incorretos'
                });
            }
        } catch (error) {
            console.error('Erro no login:', error);
            return response.json({
                message: 'Erro interno do servidor'
            });
        }
    }
};

module.exports = AutorizacaoController;