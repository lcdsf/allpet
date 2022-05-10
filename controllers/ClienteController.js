const {Foto, Cliente, Endereco, Produto, Avaliacao, Requerimento, StatusRequerimento, Compra, StatusCompra, ItemCompra, Historico} = require("../database/models");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const session = require("express-session");
//const fs = require('fs');

const clienteController = {

    index: async (req, res) =>{
        const clientes = await Cliente.findAll();
        res.render('listaClientes', { clientes } );
    },

    create: (req, res) => {
        res.render("cadastroUser");
    },

    edit: async (req, res) =>{
        const usuario = await Cliente.findByPk(req.params.id, {raw:true});

        res.render('editaCliente', {usuario});
    },
    
    home: async(req, res) => {

        //BUSCA TODOS OS PRODS PARA A VIEW
        const produtos = await Produto.findAll({
            order: [['id', 'DESC']],
            include: 'fotos' 
        })
        .then(result => result.map(produto => produto.toJSON()));


        //BUSCA FOTO DO ULTIMO ITEM VISTO - HISTORICO CLIENTE

        let ultimovisto = "";

        const ultimoItemHistorico = await Historico.findOne({
            raw: true,
            where: {clientes_id: req.session.usuario.id},
            include: 'produto',
            order:[['id', 'DESC']]
        });

        if (ultimoItemHistorico){

            const FotoUltimoProd = await Foto.findOne({
                raw: true,
                where: {produtos_id: ultimoItemHistorico.produtos_id}
            });

            ultimovisto = FotoUltimoProd.fotourl;

           // console.log('ULTIMO PROD VISTO: ', FotoUltimoProd);
        }
        
        res.render('home', {usuario: req.session.usuario, produtos, ultimovisto});
    },

    carrinho: async (req, res) => {
        
        res.render('carrinho');
    },

    addCarrinho: async (req, res) => {

        console.log('REQ: ', req.body);
        console.log('REQ PARAMS', req.params);
        //console.log('REQ ALL: ', req);

            //SALVA ITEM NO CARRINHO
            // let carrinho = req.cookies['historico'];
            // carrinho.push(id);
            // res.cookie('historico', histnav);
        
        res.redirect('/produto/'+req.params.id);
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

        // let ids = req.cookies['historico'];
        // console.log('IDs do histórico: ', ids);
        // ids = ids.map(id => parseInt(id));
       // result => result.map(produto => produto.toJSON()))

        const historico = await Historico.findAll( {
        include: [/*'categoria',*/'produto'/*,'itens_compras'*/],
        where: {clientes_id: req.session.usuario.id},
        order: [['id', 'DESC']]
        })
        .then(itens => itens.map(item => item.toJSON()));

        let ids = historico.map(item => item.produto.id);

        console.log('IDS encontrados: ', ids);

        const produtos = await Produto.findAll({
            where: {id: ids},
            include: 'fotos'
        })
        .then(result => result.map(produto => produto.toJSON()));
        

        res.render('historico', {produtos});
    },

    avaliacao: async (req, res) =>{
        const {nota, comentario} = req.body;

        const idcliente = req.session.usuario.id;
        const idproduto = req.params.id;

        const usuarioJaAvaliou = await Avaliacao.findOne({
            where: {
                clientes_id: idcliente,
                produtos_id: idproduto
            }
        })

        if (usuarioJaAvaliou){
            req.session.usuario.avaliou = idproduto;
        }

        await Avaliacao.create({
            descricao: comentario,
            datahora: Date.now(),
            nota,
            produtos_id: idproduto,
            clientes_id: idcliente,

        });


        res.redirect('/produto/'+req.params.id);


    },

    histdelete: async (req, res) =>{
        await Historico.destroy({
            where: {clientes_id: req.session.usuario.id}
        });

        res.redirect('/cliente/historico');
    }

};

module.exports = clienteController;