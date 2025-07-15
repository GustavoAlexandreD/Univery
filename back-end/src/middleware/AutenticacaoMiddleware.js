const jwt = require('jsonwebtoken');
require('dotenv').config();

const AutenticacaoMiddleware = {
    verificarToken: (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader) {
                return res.status(401).json({
                    message: 'Token de acesso não fornecido'
                });
            }

            const token = authHeader.split(' ')[1]; // Remove "Bearer " do início
            
            if (!token) {
                return res.status(401).json({
                    message: 'Token de acesso inválido'
                });
            }

            const decoded = jwt.verify(token, process.env.TOKEN);
            req.usuario = decoded; // Adiciona dados do usuário à requisição
            
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'Token expirado'
                });
            }
            
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    message: 'Token inválido'
                });
            }
            
            return res.status(500).json({
                message: 'Erro ao verificar token'
            });
        }
    },

    verificarTipoUsuario: (tiposPermitidos) => {
        return (req, res, next) => {
            try {
                const { tipo } = req.usuario;
                
                if (!tiposPermitidos.includes(tipo)) {
                    return res.status(403).json({
                        message: 'Acesso negado. Tipo de usuário não autorizado.'
                    });
                }
                
                next();
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro ao verificar tipo de usuário'
                });
            }
        };
    }
};

module.exports = AutenticacaoMiddleware;