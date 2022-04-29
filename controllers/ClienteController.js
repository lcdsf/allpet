const {Cliente, Endereco, Produto} = require("../database/models");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
//const fs = require('fs');

const clienteController = {

    index: async (req, res) =>{
        const clientes = await Cliente.findAll();
        res.render('listaClientes', { clientes } );
    },

    create: (req, res) => {
        res.render("cadastroUser");
    },
    home: async(req, res) => {
        const produtos = await Produto.findAll({
            order: [['id', 'DESC']],
            include: 'fotos' 
        })
        .then(result => result.map(produto => produto.toJSON()));

        res.render('home', {usuario: req.session.usuario, produtos});
    },
    store: async (req, res) => {

        const erros = validationResult(req);

        //console.log('CONTEUDO DE ERRROS: ', erros);

        if (!erros.isEmpty()){
            res.render('cadastroUser', { erros: erros.array().map(erro => erro.msg) });
            //return;
        }

        const {nome, sobrenome, cpf, telefone, 
        rua, cep, numero, bairro, cidade, estado, complemento, 
        email, senha, confirmaSenha} = req.body;

            
        if (senha === confirmaSenha){ 

            let cliente;

            if (!req.file){
                cliente = await Cliente.create(
                    {
                        nome,
                        sobrenome,
                        email,
                        senha: bcrypt.hashSync(senha, 10),
                        cpf,
                        telefone,
                        data_cadastro: Date.now(),
                        fotourl: "defaultprofile.jpg"
                    }
                );
            }else{
                cliente = await Cliente.create(
                    {
                        nome,
                        sobrenome,
                        email,
                        senha: bcrypt.hashSync(senha, 10),
                        cpf,
                        telefone,
                        data_cadastro: Date.now(),
                        fotourl: req.file.filename
                    }
                );
            }
 

            await Endereco.create(
                {
                    cep,
                    rua,
                    numero,
                    bairro,
                    cidade,
                    estado,
                    complemento,
                    clientes_id: cliente.id
                }
            );

            res.render('cadastroUser', {cadastroOK: 'Cadastro realizado com sucesso! Clique no botão acima "Entrar" para fazer o login.'});
        }else{
            res.render('cadastroUser', {erro: 'Senhas não coincidem, tente novamente.'});
        }

        
    },
    sair: async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
    painel: async (req, res) => {
        res.render('areaCliente', {usuario: req.session.usuario});
    },
    historico: async (req, res) => {

        let ids = req.cookies['historico'];

        console.log('IDs do histórico: ', ids);

        ids = ids.map(id => parseInt(id));

       // result => result.map(produto => produto.toJSON()))

        const produtos = await Produto.findAll({
            where: {id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));
        

        res.render('historico', {produtos});
    }
};

module.exports = clienteController;