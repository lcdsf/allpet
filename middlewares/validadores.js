const {check} = require('express-validator');

const validadores = {

    cadastroCliente: [
        check('nome').notEmpty().withMessage('Campo "Nome" obrigatório').bail(),
        check('sobrenome').notEmpty().withMessage('Campo "Sobrenome" obrigatório').bail(),
        check('cpf').notEmpty().withMessage('Campo "CPF" obrigatório').bail(),
        check('telefone').notEmpty().withMessage('Campo "Telefone" obrigatório').bail(),
        check('cep').notEmpty().withMessage('Campo "CEP" obrigatório').bail(),
        check('rua').notEmpty().withMessage('Campo "Rua" obrigatório').bail(),
        check('numero').notEmpty().withMessage('Campo "Número (Endereço)" obrigatório').bail(),
        check('bairro').notEmpty().withMessage('Campo "Bairro" obrigatório').bail(),
        check('cidade').notEmpty().withMessage('Campo "Cidade" obrigatório').bail(),
        check('estado').notEmpty().withMessage('Campo "Estado" obrigatório').bail(),
        check('email').notEmpty().withMessage('Campo "E-mail" obrigatório').bail(),
        check('senha').notEmpty().withMessage('Campo "Senha" obrigatório').bail(),
        check('confirmaSenha').notEmpty().withMessage('Campo "Confirmar senha" obrigatório')
    ]
};

module.exports = validadores;