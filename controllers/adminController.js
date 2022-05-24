const {Administrador, Requerimento, StatusRequerimento, Compra, StatusCompra, Produto, Foto} = require('../database/models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const { compra } = require('./clienteController');


const adminController = {
    index: async (req, res) => {
        res.render('areaAdmin', {admin: req.session.admin});
    },

    listaAdmins: async (req, res) => {

        const admins = await Administrador.findAll();

        res.render('listaAdmins', {admin: req.session.admin, administradores: admins});
    },

    login: async (req, res) => {
        res.render('loginAdmin', { admin: req.session.admin});
    },

    create: async (req, res) => {
        res.render('cadastroAdmin', {admin: req.session.admin});
    },

    store: async (req, res) => {

        //console.log('DADOS DO ADMIN A SER CADASTRADO: ', req.body);

        const erros = validationResult(req);

        //console.log('CONTEUDO DE ERRROS: ', erros);

        if (!erros.isEmpty()){
            // res.render('cadastroUser', { erros: erros.array().map(erro => erro.msg) });
            res.render('cadastroAdmin', { erros: erros.array().map(erro => erro.msg), admin: req.session.admin});

            return;

            //return;
        }

        const {nome, sobrenome, email, senha, confirmaSenha} = req.body;

        if (senha === confirmaSenha){ 
            
            await Administrador.create(
                {
                    nome,
                    sobrenome,
                    email,
                    senha: bcrypt.hashSync(senha, 10),
                    data_cadastro: Date.now(),
                }
            );
            res.render('cadastroAdmin', {cadastroOK: 'Cadastro realizado com sucesso!',  admin: req.session.admin});
        }else{
            res.render('cadastroAdmin', {erro: 'Senhas não coincidem, tente novamente.',  admin: req.session.admin});
        }

        
    },

    listaCompras: async (req, res) => {

    const comprasabertas = await Compra.findAll({ 
        include: 'cliente',
        where: {finalizado: false} 
    });

    const comprasfinalizadas = await Compra.findAll({ 
        include: 'cliente',
        where: {finalizado: true} 
    });

        //console.log('LISTA DE COMPRAS', compras);


        
        res.render('listaCompras', {admin: req.session.admin, comprasabertas, comprasfinalizadas});
    },

    detalheCompra: async (req, res) => {
        const compra  = await Compra.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Produto, 
                as: 'produtos', 
                include:[{
                    model: Foto, 
                    as: 'fotos'
                }]
                },
                'endereco',
                'statuscompra'
            ]
        });


        res.render('detalheCompra', {compra, admin: req.session.admin});

    },

    addStatusCompra: async (req, res) => {

    },

    editaStatusCompra: async (req, res) => {

        // console.log('STATUSCOMPRA EDIT: ', req.body);
        
        await StatusCompra.update(
            {
                status: req.body.descricao,
                data: Date.now()
            },
            {where: {id: req.body.statusid}}
        );

        res.redirect('/admin/compra/'+req.params.id+'?Status atualizado com sucesso!')
    },

    addStatusCompra: async (req, res) => {

        
        await StatusCompra.create({
                status: req.body.descricao,
                data: Date.now(),
                compras_id: req.params.id
        });

        res.redirect('/admin/compra/'+req.params.id+'?Status adicionado com sucesso!')
    },

    deleteStatusCompra: async (req, res) => {

        await StatusCompra.destroy({where: {id: req.body.statusid}});

        res.redirect('/admin/compra/'+req.params.id+'?Status removido com sucesso!')

    },

    finalizaCompra: async (req, res) => {
        await Compra.update({finalizado: true}, {where: {id: req.params.id}});

        res.redirect('/admin/compra/'+req.params.id+'?Compra finalizada com sucesso!')

    },


    listaReqs: async (req, res) => {

        const reqs = await Requerimento.findAll({ include: 'compra' });

        res.render('listaReqs', {admin: req.session.admin, reqs});
    },

    sair: async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = adminController;