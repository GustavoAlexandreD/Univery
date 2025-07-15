const Estabelecimento = require("../model/Estabelecimento");

const RestaurantesServices = {

    validandoRestaurante: async (dados) => {

        // Validação do nome (qualquer nome aceito, pode remover essa validação se quiser)
        if (!dados.nome || dados.nome.trim().length === 0) {
            throw('O nome do estabelecimento é obrigatório.');
        }

        // Validação do CNPJ (exato 14 dígitos numéricos)
        if (!dados.cnpj || !/^\d{14}$/.test(dados.cnpj)) {
            throw('CNPJ inválido. Deve conter exatamente 14 dígitos numéricos.');
        }

        // Verifica se o CNPJ já está cadastrado
        const cnpjExistente = await Estabelecimento.findOne({
            where: { cnpj: dados.cnpj }
        });
        if (cnpjExistente) {
            throw('CNPJ já está cadastrado para outro restaurante.');
        }

        // Validação do e-mail (qualquer e-mail válido, você pode refinar)
        if (!dados.email || !/\S+@\S+\.\S+/.test(dados.email)) {
            throw('E-mail inválido.');
        }

        // Verifica se o e-mail já está em uso
        const emailExistente = await Estabelecimento.findOne({
            where: { email: dados.email }
        });
        if (emailExistente) {
            throw('E-mail já está sendo utilizado por outro restaurante.');
        }

        // Validação da senha (mesma regra que cliente)
        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!dados.senha || !regexSenha.test(dados.senha)) {
            throw('A senha deve conter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula, 1 número e 1 símbolo.');
        }

        // Validação do telefone (opcional)
        if (dados.telefone) {
            const telefoneLimpo = dados.telefone.replace(/\D/g, '');
            if (telefoneLimpo.length < 10 || telefoneLimpo.length > 15) {
                throw('Telefone inválido. Deve conter entre 10 e 15 dígitos numéricos.');
            }
        }
    }
};

module.exports = RestaurantesServices;
