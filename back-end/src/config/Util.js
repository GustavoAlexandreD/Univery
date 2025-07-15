const Util = {
    // Função para validar email
    validarEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Função para validar CNPJ (básica)
    validarCNPJ: (cnpj) => {
        return /^\d{14}$/.test(cnpj);
    },

    // Função para validar telefone
    validarTelefone: (telefone) => {
        const telefoneLimpo = telefone.replace(/\D/g, '');
        return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 15;
    },

    // Função para formatar resposta de sucesso
    respostaSucesso: (message, data = null) => {
        const response = { message };
        if (data) response.data = data;
        return response;
    },

    // Função para formatar resposta de erro
    respostaErro: (message, error = null) => {
        const response = { message };
        if (error && process.env.NODE_ENV === 'development') {
            response.error = error;
        }
        return response;
    },

    // Função para paginar resultados
    paginar: (page = 1, limit = 10) => {
        const offset = (page - 1) * limit;
        return { limit: parseInt(limit), offset: parseInt(offset) };
    },

    // Função para remover campos sensíveis
    removerCamposSensiveis: (objeto, campos = ['senha']) => {
        const objetoLimpo = { ...objeto };
        campos.forEach(campo => {
            delete objetoLimpo[campo];
        });
        return objetoLimpo;
    }
};

module.exports = Util;