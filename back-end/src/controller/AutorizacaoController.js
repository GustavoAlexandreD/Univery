const jwt = require("jsonwebtoken");
const Cliente = require("../model/Cliente");
require('dotenv').config()
const Helpers = require('../config/Helpers.js');

const AutorizacaoController = {
    login: async (request, response) => {
        const body = request.body;
        const usuario = await Cliente.findOne({
            where: {
            email: body.email,
            senha: Helpers.crypto(body.senha) 
            }
        })
        if(usuario) {
            const dados = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
            const token = await jwt.sign(dados, process.env.TOKEN);
            return response.json({
                token: token,
                message: 'Usuario Logado com Sucesso!'
            })
        } else {
            return response.json({
                message: 'Login ou senha incorreto'
            })
        }
    }
}

module.exports = AutorizacaoController;