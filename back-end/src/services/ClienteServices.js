const Cliente = require("../model/Cliente");

const ClientesServices = {

    validandoCliente: async (dados) => {

        // NENHUMA validação para nome, conforme solicitado.

        // Validação do e-mail - deve terminar com @aluno.uece.br
        const regexEmailUECE = /^[^\s@]+@aluno\.uece\.br$/;
        if (!dados.email || !regexEmailUECE.test(dados.email)) {
            throw('O e-mail deve terminar com @aluno.uece.br');
        }

        // Verifica se o e-mail já está em uso
        const clienteExistente = await Cliente.findOne({
            where: { email: dados.email }
        });
        if (clienteExistente) {
            throw('E-mail já está sendo utilizado por outro cliente.');
        }

        // Validação da senha
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

module.exports = ClientesServices;
